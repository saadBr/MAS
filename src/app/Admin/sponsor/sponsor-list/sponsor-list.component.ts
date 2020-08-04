import { Component, OnInit, OnDestroy } from "@angular/core";
import { Sponsor } from '../sponsor.model';
import { SponsorService } from '../sponsor.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';
@Component({
  selector:'app-sponsors-list',
  templateUrl:'./sponsor-list.component.html',
  styleUrls:['./sponsor-list.component.css','../../../app.component.css','../../admin.component.css']
})

export class SponsorsList implements OnInit,OnDestroy {
  sponsors:Sponsor[] =  [];
  private sponsorsSub: Subscription;
  private authSub: Subscription;
  userId:string;
  userIsAuthenticated = true;

  pageSizeOptions=[10,20,50];
  sponsorPerPage = 10;
  currentPage=1;
  totalSponsors=0;
  constructor(public sponsorService: SponsorService,public authentificationService:AuthentificationServices) {}

  ngOnInit() {

    this.sponsorService.getSponsors(this.sponsorPerPage,this.currentPage);
    this.userId=this.authentificationService.getUserId();
    this.sponsorsSub=this.sponsorService.getSponsorUpdateListener().subscribe((sponsorData:{sponsors:Sponsor[],sponsorCount:number})=>{

      this.sponsors=sponsorData.sponsors;
      this.totalSponsors=sponsorData.sponsorCount;
    });
    this.userIsAuthenticated=this.authentificationService.getIsAuth();
    this.authSub = this.authentificationService.getAuthStatusListnner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.authentificationService.getUserId();
    });
  }

  onChangedPage(pageData:PageEvent) {

    this.currentPage=pageData.pageIndex+1;
    this.sponsorPerPage=pageData.pageSize;
    this.sponsorService.getSponsors(this.sponsorPerPage,this.currentPage);
  }

  onDelete(sponsorId: string) {

    this.sponsorService.deleteSponsor(sponsorId).subscribe(()=>{
      this.sponsorService.getSponsors(this.sponsorPerPage,this.currentPage);
    }),()=>{

    };
  }

  ngOnDestroy() {
    this.sponsorsSub.unsubscribe();
    this.authSub.unsubscribe();
  }


}
