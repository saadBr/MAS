import { OnDestroy, OnInit, Component } from '@angular/core';
import { ActualiteService } from 'src/app/Admin/actualites/actualite.service';
import { Subscription } from 'rxjs';
import { Actualite } from 'src/app/Admin/actualites/actualite.model';
import { ParamMap, ActivatedRoute } from '@angular/router';



@Component({
  selector:'app-actualiteById',
  templateUrl:'./actualiteById.component.html',
  styleUrls:['./actualiteById.component.css']
})
export class ActualiteByIdComponent implements OnInit,OnDestroy {
  private actualiteId: string;
  actualite:Actualite;
  isLoading=true;
  constructor(public actualiteService: ActualiteService,
              public route: ActivatedRoute,){};

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('actualiteId')){
        this.actualiteId=paramMap.get('actualiteId');
        this.actualiteService.getActualite(this.actualiteId).subscribe(actualiteData=> {
          this.actualite = {
            id: actualiteData._id,
            titre: actualiteData.titre,
            contenu:actualiteData.contenu,
            imagePath:actualiteData.imagePath,
            date:actualiteData.date,
            creator:actualiteData.creator
          };
          this.isLoading=false;
        })
      }
    })
  }

  ngOnDestroy(){
  }
}
