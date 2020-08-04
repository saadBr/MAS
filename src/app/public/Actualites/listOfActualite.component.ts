import { OnDestroy, OnInit, Component } from '@angular/core';
import { ActualiteService } from 'src/app/Admin/actualites/actualite.service';
import { Actualite } from 'src/app/Admin/actualites/actualite.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector:'app-listOfActualite',
  templateUrl:'./listOfActualite.component.html',
  styleUrls:['./listOfActualite.component.css']
})
export class listOfActualiteComponent implements OnInit,OnDestroy {
  actualites:Actualite[] =  [];
  private actualitesSub: Subscription;
  pageSizeOptions=[10,50,100];
  actualitePerPage = 20;
  currentPage=1;
  totalActualites=0;
  isLoading=true;
  constructor(public actualiteService: ActualiteService){}
  ngOnInit(){
    this.actualiteService.getActualites(this.actualitePerPage,this.currentPage);
    this.actualitesSub=this.actualiteService.getActualiteUpdateListener().subscribe((actualiteData:{actualites:Actualite[],actualiteCount:number})=>{
      this.actualites=actualiteData.actualites;
      this.totalActualites=actualiteData.actualiteCount;
      this.isLoading=false;
    });
  }
  onChangedPage(pageData:PageEvent) {
    this.currentPage=pageData.pageIndex+1;
    this.actualitePerPage=pageData.pageSize;
    this.actualiteService.getActualites(this.actualitePerPage,this.currentPage);
  }
  ngOnDestroy(){
    this.actualitesSub.unsubscribe();
  }
}
