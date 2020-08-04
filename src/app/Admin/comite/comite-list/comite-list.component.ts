import { Component, OnInit, OnDestroy } from "@angular/core";
import { Comite } from '../comite.model';
import { ComiteService } from '../comite.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';
@Component({
  selector:'app-comites-list',
  templateUrl:'./comite-list.component.html',
  styleUrls:['./comite-list.component.css','../../../app.component.css','../../admin.component.css']
})

export class ComitesList implements OnInit,OnDestroy {
  comites:Comite[] =  [];
  private comitesSub: Subscription;
  comitePerPage = 10;
  currentPage=1;
  totalComites=0;
  private authSub: Subscription;
  userId:string;
  userIsAuthenticated = true;

  pageSizeOptions=[10,20,50];
  constructor(public comiteService: ComiteService,public authentificationService:AuthentificationServices) {}

  ngOnInit() {

    this.userId=this.authentificationService.getUserId();
    this.comiteService.getComites(this.comitePerPage,this.currentPage);
    this.comitesSub=this.comiteService.getComiteUpdateListener().subscribe((comiteData:{comites:Comite[],comiteCount:number})=>{

      this.comites=comiteData.comites;
      this.totalComites=comiteData.comiteCount;
    });
    this.userIsAuthenticated=this.authentificationService.getIsAuth();
    this.authSub = this.authentificationService.getAuthStatusListnner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.authentificationService.getUserId();
    });
  }

  onChangedPage(pageData:PageEvent) {

    this.currentPage=pageData.pageIndex+1;
    this.comitePerPage=pageData.pageSize;
    this.comiteService.getComites(this.comitePerPage,this.currentPage);
  }

  onDelete(comiteId: string) {

    this.comiteService.deleteComite(comiteId).subscribe(()=>{
      this.comiteService.getComites(this.comitePerPage,this.currentPage);
    }),()=>{

    };
  }

  ngOnDestroy() {
    this.comitesSub.unsubscribe();
    this.authSub.unsubscribe();
  }


}
