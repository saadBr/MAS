import { Component, OnInit, OnDestroy } from "@angular/core";
import { Academie } from '../academie.model';
import { AcademieService } from '../academie.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';
@Component({
  selector:'app-academies-list',
  templateUrl:'./academie-list.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})

export class AcademiesList implements OnInit,OnDestroy {
  academies:Academie[] =  [];
  private academiesSub: Subscription;
  private authSub: Subscription;
  userId:string;
  userIsAuthenticated = true;

  pageSizeOptions=[10,20,50];
  academiePerPage = 10;
  currentPage=1;
  totalAcademies=0;
  constructor(public academieService: AcademieService,public authentificationService:AuthentificationServices) {}

  ngOnInit() {

    this.userId=this.authentificationService.getUserId();
    this.academieService.getAcademies(this.academiePerPage,this.currentPage);
    this.academiesSub=this.academieService.getAcademieUpdateListener().subscribe((academieData:{academies:Academie[],academieCount:number})=>{

      this.academies=academieData.academies;
      this.totalAcademies=academieData.academieCount;
    });
    this.userIsAuthenticated=this.authentificationService.getIsAuth();
    this.authSub = this.authentificationService.getAuthStatusListnner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.authentificationService.getUserId();
    });
  }

  onChangedPage(pageData:PageEvent) {

    this.currentPage=pageData.pageIndex+1;
    this.academiePerPage=pageData.pageSize;
    this.academieService.getAcademies(this.academiePerPage,this.currentPage);
  }

  onDelete(academieId: string) {

    this.academieService.deleteAcademie(academieId).subscribe(()=>{
      this.academieService.getAcademies(this.academiePerPage,this.currentPage);
    }),()=>{

    };
  }

  ngOnDestroy() {
    this.academiesSub.unsubscribe();
    this.authSub.unsubscribe();
  }


}
