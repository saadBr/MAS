import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Slider } from 'src/app/Admin/slider/slider.model';
import { Subscription, Subject } from 'rxjs';
import { SliderService } from 'src/app/Admin/slider/slider.service';
import { Actualite } from 'src/app/Admin/actualites/actualite.model';
import { Academie } from 'src/app/Admin/academie/academie.model';
import { Sponsor } from 'src/app/Admin/sponsor/sponsor.model';
import { Coupe } from 'src/app/Admin/coupe/coupe.model';
import { SponsorService } from 'src/app/Admin/sponsor/sponsor.service';
import { CoupeService } from 'src/app/Admin/coupe/coupe.service';
import { ActualiteService } from 'src/app/Admin/actualites/actualite.service';
import { AcademieService } from 'src/app/Admin/academie/academie.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
@Injectable({providedIn:"root"})
export class AccueilComponent implements OnInit,OnDestroy{
  sliders:Slider[] =  [];
  actualites:Actualite[] =  [];
  academies:Academie[] =  [];
  coupes:Coupe[] =  [];
  sponsors:Sponsor[] =  [];
  private slidersSub: Subscription;
  private actualitesSub: Subscription;
  private academiesSub: Subscription;
  private coupesSub: Subscription;
  private sponsorsSub: Subscription;

  coupePerPage = 10;
  currentPage=1;
  totalCoupes=0;
  pageSizeOptions=[10,20,50];
  sponsorPerPage = 10;
  totalSponsors=0;
  sliderPerPage = 10;
  totalSliders=0;
  actualitePerPage = 4;
  totalActualites=0;
  academiePerPage = 4;
  totalAcademies=0;
  isLoading=true;

  constructor(public sliderService: SliderService,
              public sponsorService: SponsorService,
              public coupeService:CoupeService,
              public actualiteService:ActualiteService,
              public academieService:AcademieService) {}

  ngOnInit(){
    this.sliderService.getSliders(this.sliderPerPage,this.currentPage);
    this.slidersSub=this.sliderService.getSliderUpdateListener().subscribe((sliderData:{sliders:Slider[],sliderCount:number})=>{
      this.sliders=sliderData.sliders;
      this.totalSliders=sliderData.sliderCount;
      this.isLoading=false;
    });
    this.sponsorService.getSponsors(this.sponsorPerPage,this.currentPage);
    this.sponsorsSub=this.sponsorService.getSponsorUpdateListener().subscribe((sponsorData:{sponsors:Sponsor[],sponsorCount:number})=>{
      this.sponsors=sponsorData.sponsors;
      this.totalSponsors=sponsorData.sponsorCount;

    });
    this.coupeService.getCoupes(this.coupePerPage,this.currentPage);
    this.coupesSub=this.coupeService.getCoupeUpdateListener().subscribe((coupeData:{coupes:Coupe[],coupeCount:number})=>{
      this.coupes=coupeData.coupes;
      this.totalCoupes=coupeData.coupeCount;
    });
    this.actualiteService.getActualites(this.actualitePerPage,this.currentPage);
    this.actualitesSub=this.actualiteService.getActualiteUpdateListener().subscribe((actualiteData:{actualites:Actualite[],actualiteCount:number})=>{
      this.actualites=actualiteData.actualites;
      this.totalActualites=actualiteData.actualiteCount;
    });
    this.academieService.getAcademies(this.academiePerPage,this.currentPage);
    this.academiesSub=this.academieService.getAcademieUpdateListener().subscribe((academieData:{academies:Academie[],academieCount:number})=>{
      this.academies=academieData.academies;
      this.totalAcademies=academieData.academieCount;
    });
  }

  ngOnDestroy(){
    this.slidersSub.unsubscribe();
    this.coupesSub.unsubscribe();
    this.actualitesSub.unsubscribe();
    this.academiesSub.unsubscribe();
    this.sponsorsSub.unsubscribe();
  }
}
