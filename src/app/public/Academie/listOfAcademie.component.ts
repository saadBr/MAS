import { OnDestroy, OnInit, Component } from '@angular/core';
import { AcademieService } from 'src/app/Admin/academie/academie.service';
import { Academie } from 'src/app/Admin/academie/academie.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector:'app-listOfAcademie',
  templateUrl:'./listOfAcademie.component.html',
  styleUrls:['./listOfAcademie.component.css']
})
export class listOfAcademieComponent implements OnInit,OnDestroy {
  academies:Academie[] =  [];
  private academiesSub: Subscription;
  pageSizeOptions=[20,50,100];
  academiePerPage = 20;
  currentPage=1;
  totalAcademies=0;
  isLoading = true;
  constructor(public academieService: AcademieService){}
  ngOnInit(){
    this.academieService.getAcademies(this.academiePerPage,this.currentPage);
    this.academiesSub=this.academieService.getAcademieUpdateListener().subscribe((academieData:{academies:Academie[],academieCount:number})=>{
      this.academies=academieData.academies;
      this.totalAcademies=academieData.academieCount;
      this.isLoading=false;
    });
  }
  onChangedPage(pageData:PageEvent) {
    this.currentPage=pageData.pageIndex+1;
    this.academiePerPage=pageData.pageSize;
    this.academieService.getAcademies(this.academiePerPage,this.currentPage);
  }
  ngOnDestroy(){
    this.academiesSub.unsubscribe();
  }
}
