import { Component, OnInit, OnDestroy } from "@angular/core";
import { Slider } from '../slider.model';
import { SliderService } from '../slider.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';
@Component({
  selector:'app-sliders-list',
  templateUrl:'./slider-list.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})

export class SlidersList implements OnInit,OnDestroy {
  sliders:Slider[] =  [];
  private slidersSub: Subscription;
  private authSub: Subscription;
  userId:string;
  userIsAuthenticated = true;

  pageSizeOptions=[10,20,50];
  sliderPerPage = 10;
  currentPage=1;
  totalSliders=0;
  constructor(public sliderService: SliderService,public authentificationService:AuthentificationServices) {}

  ngOnInit() {

    this.sliderService.getSliders(this.sliderPerPage,this.currentPage);
    this.userId=this.authentificationService.getUserId();
    this.slidersSub=this.sliderService.getSliderUpdateListener().subscribe((sliderData:{sliders:Slider[],sliderCount:number})=>{

      this.sliders=sliderData.sliders;
      this.totalSliders=sliderData.sliderCount;
    });
    this.userIsAuthenticated=this.authentificationService.getIsAuth();
    this.authSub = this.authentificationService.getAuthStatusListnner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.authentificationService.getUserId();
    });

  }

  onChangedPage(pageData:PageEvent) {

    this.currentPage=pageData.pageIndex+1;
    this.sliderPerPage=pageData.pageSize;
    this.sliderService.getSliders(this.sliderPerPage,this.currentPage);
  }

  onDelete(sliderId: string) {

    this.sliderService.deleteSlider(sliderId).subscribe(()=>{
      this.sliderService.getSliders(this.sliderPerPage,this.currentPage);
    }),()=>{

    };
  }

  ngOnDestroy() {
    this.slidersSub.unsubscribe();
    this.authSub.unsubscribe();
  }


}
