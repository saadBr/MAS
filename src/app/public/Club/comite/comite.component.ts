import { OnDestroy, OnInit, Component } from '@angular/core';
import { ComiteService } from 'src/app/Admin/comite/comite.service';
import { Subscription } from 'rxjs';
import { Comite } from 'src/app/Admin/comite/comite.model';



@Component({
  selector:'app-comite',
  templateUrl:'./comite.component.html',
  styleUrls:['./comite.component.css']
})
export class ComiteComponent implements OnInit,OnDestroy {
  comites:Comite[] =  [];
  private comitesSub: Subscription;
  comitePerPage = 10;
  currentPage=1;
  totalComites=0;
  isLoading=true;
  constructor(public comiteService: ComiteService){}
  ngOnInit(){
    this.comiteService.getComites(this.comitePerPage,this.currentPage);
    this.comitesSub=this.comiteService.getComiteUpdateListener().subscribe((comiteData:{comites:Comite[],comiteCount:number})=>{
      this.comites=comiteData.comites;
      this.totalComites=comiteData.comiteCount;
      this.isLoading=false;
    });
  }

  ngOnDestroy(){
    this.comitesSub.unsubscribe();
  }
}
