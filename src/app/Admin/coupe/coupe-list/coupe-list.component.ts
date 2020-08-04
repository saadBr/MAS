import { Component, OnInit, OnDestroy } from "@angular/core";
import { Coupe } from '../coupe.model';
import { CoupeService } from '../coupe.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';
@Component({
  selector:'app-coupes-list',
  templateUrl:'./coupe-list.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})

export class CoupesList implements OnInit,OnDestroy {
  coupes:Coupe[] =  [];
  private coupesSub: Subscription;
  private authSub: Subscription;
  userId:string;
  userIsAuthenticated = true;

  pageSizeOptions=[10,20,50];
  coupePerPage = 10;
  currentPage=1;
  totalCoupes=0;
  constructor(public coupeService: CoupeService,public authentificationService:AuthentificationServices) {}

  ngOnInit() {

    this.coupeService.getCoupes(this.coupePerPage,this.currentPage);
    this.userId=this.authentificationService.getUserId();
    this.coupesSub=this.coupeService.getCoupeUpdateListener().subscribe((coupeData:{coupes:Coupe[],coupeCount:number})=>{

      this.coupes=coupeData.coupes;
      this.totalCoupes=coupeData.coupeCount;
    });
    this.userIsAuthenticated=this.authentificationService.getIsAuth();
    this.authSub = this.authentificationService.getAuthStatusListnner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.authentificationService.getUserId();
    });
  }

  onChangedPage(pageData:PageEvent) {

    this.currentPage=pageData.pageIndex+1;
    this.coupePerPage=pageData.pageSize;
    this.coupeService.getCoupes(this.coupePerPage,this.currentPage);
  }

  onDelete(coupeId: string) {

    this.coupeService.deleteCoupe(coupeId).subscribe(()=>{
      this.coupeService.getCoupes(this.coupePerPage,this.currentPage);
    }),()=>{

    };
  }

  ngOnDestroy() {
    this.coupesSub.unsubscribe();
    this.authSub.unsubscribe();
  }


}
