import { OnDestroy, OnInit, Component } from '@angular/core';
import { ButtonsModule, WavesModule, CardsModule } from 'angular-bootstrap-md';
import { Presentation } from 'src/app/Admin/presentation/presentation.model';
import { PresentationService } from 'src/app/Admin/presentation/presentation.service';



@Component({
  selector:'app-presentation',
  templateUrl:'./presentation.component.html',
  styleUrls:['./presentation.component.css']
})
export class PresentationComponent implements OnInit,OnDestroy {

  private presentationId:string;
  presentation:Presentation;
  isLoading=true;
  constructor( public presentationService: PresentationService) {}
  ngOnInit(){
    this.presentationId="5ef94b6b17f793244451958b";
        this.presentationService.getPresentation(this.presentationId).subscribe(presentationData=> {
          this.presentation = {
            id: presentationData._id,
            contenu:presentationData.contenu,
            imagePath:presentationData.imagePath,
            creator:presentationData.creator
          };
          this.isLoading=false;
    });
  }

  ngOnDestroy(){}
}
