import { Component, OnInit, OnDestroy } from "@angular/core";
import { Actualite } from '../actualite.model';
import { ActualiteService } from '../actualite.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';
@Component({
  selector:'app-actualites-list',
  templateUrl:'./actualite-list.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})

export class ActualitesList implements OnInit,OnDestroy {
  actualites:Actualite[] =  [];
  private actualitesSub: Subscription;
  pageSizeOptions=[10,20,50];
  actualitePerPage = 10;
  currentPage=1;
  totalActualites=0;
  private authSub: Subscription;
  userId:string;
  userIsAuthenticated = true;

  constructor(public actualiteService: ActualiteService,public authentificationService:AuthentificationServices) {}

  ngOnInit() {

    this.userId=this.authentificationService.getUserId();
    this.actualiteService.getActualites(this.actualitePerPage,this.currentPage);
    this.actualitesSub=this.actualiteService.getActualiteUpdateListener().subscribe((actualiteData:{actualites:Actualite[],actualiteCount:number})=>{

      this.actualites=actualiteData.actualites;
      this.totalActualites=actualiteData.actualiteCount;
    });
    this.userIsAuthenticated=this.authentificationService.getIsAuth();
    this.authSub = this.authentificationService.getAuthStatusListnner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.authentificationService.getUserId();
    });
  }

  onChangedPage(pageData:PageEvent) {

    this.currentPage=pageData.pageIndex+1;
    this.actualitePerPage=pageData.pageSize;
    this.actualiteService.getActualites(this.actualitePerPage,this.currentPage);
  }

  onDelete(actualiteId: string) {

    this.actualiteService.deleteActualite(actualiteId).subscribe(()=>{
      this.actualiteService.getActualites(this.actualitePerPage,this.currentPage);
    }),()=>{

    };
  }

  ngOnDestroy() {
    this.actualitesSub.unsubscribe();
    this.authSub.unsubscribe();
  }


}
