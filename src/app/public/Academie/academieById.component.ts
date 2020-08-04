import { OnDestroy, OnInit, Component } from '@angular/core';
import { AcademieService } from 'src/app/Admin/academie/academie.service';
import { Subscription } from 'rxjs';
import { Academie } from 'src/app/Admin/academie/academie.model';
import { ParamMap, ActivatedRoute } from '@angular/router';



@Component({
  selector:'app-academieById',
  templateUrl:'./academieById.component.html',
  styleUrls:['./academieById.component.css']
})
export class AcademieByIdComponent implements OnInit,OnDestroy {
  private academieId: string;
  isLoading=true;
  academie:Academie;
  constructor(public academieService: AcademieService,
              public route: ActivatedRoute,){};

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('academieId')){
        this.academieId=paramMap.get('academieId');
        this.academieService.getAcademie(this.academieId).subscribe(academieData=> {
          this.academie = {
            id: academieData._id,
            titre: academieData.titre,
            contenu:academieData.contenu,
            imagePath:academieData.imagePath,
            date:academieData.date,
            creator:academieData.creator
          };
          this.isLoading=false;
        })
      }
    })
  }

  ngOnDestroy(){
  }
}
