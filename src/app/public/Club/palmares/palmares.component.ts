import { OnDestroy, OnInit, Component } from '@angular/core';
import { ButtonsModule, WavesModule, CardsModule } from 'angular-bootstrap-md';
import { Palmares } from 'src/app/Admin/palmares/palmares.model';
import { PalmaresService } from 'src/app/Admin/palmares/palmares.service';
import { Coupe } from 'src/app/Admin/coupe/coupe.model';
import { Subscription } from 'rxjs';
import { CoupeService } from 'src/app/Admin/coupe/coupe.service';



@Component({
  selector:'app-palmares',
  templateUrl:'./palmares.component.html',
  styleUrls:['./palmares.component.css']
})
export class PalmaresComponent implements OnInit,OnDestroy {
  private palmaresId: string;
  palmares:Palmares;
  coupes:Coupe[] =  [];
  private coupesSub: Subscription;
  coupePerPage = 10;
  currentPage=1;
  totalCoupes=0;
  isLoading=true;
  constructor(public palmaresService: PalmaresService,public coupeService:CoupeService) {}

  ngOnInit(){
    this.palmaresId="5ef933779c47e02a50f0d053";
        this.palmaresService.getPalmares(this.palmaresId).subscribe(palmaresData=> {
          this.palmares = {
            id: palmaresData._id,
            contenu:palmaresData.contenu,
            imagePath:palmaresData.imagePath,
            creator:palmaresData.creator
          };
   })
   this.coupeService.getCoupes(this.coupePerPage,this.currentPage);
    this.coupesSub=this.coupeService.getCoupeUpdateListener().subscribe((coupeData:{coupes:Coupe[],coupeCount:number})=>{
      this.coupes=coupeData.coupes;
      this.totalCoupes=coupeData.coupeCount;
      this.isLoading=false;
    });
  }

  ngOnDestroy(){

  }
}
