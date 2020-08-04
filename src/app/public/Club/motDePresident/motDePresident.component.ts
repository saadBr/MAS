import { OnDestroy, OnInit, Component } from '@angular/core';
import { ButtonsModule, WavesModule, CardsModule } from 'angular-bootstrap-md';
import { MotDePresident } from 'src/app/Admin/motDePresident/motDePresident.model';
import { MotDePresidentService } from 'src/app/Admin/motDePresident/motDePresident.service';



@Component({
  selector:'app-motDePresident',
  templateUrl:'./motDePresident.component.html',
  styleUrls:['./motDePresident.component.css']
})
export class MotDePresidentComponent implements OnInit,OnDestroy {

  private motDePresidentId:string;
  motDePresident:MotDePresident;
  isLoading=true;
  constructor( public motDePresidentService: MotDePresidentService) {}
  ngOnInit(){
    this.motDePresidentId="5ef946cdeee8b12bd003037f";
        this.motDePresidentService.getMotDePresident(this.motDePresidentId).subscribe(motDePresidentData=> {
          this.motDePresident = {
            id: motDePresidentData._id,
            contenu:motDePresidentData.contenu,
            imagePath:motDePresidentData.imagePath,
            creator:motDePresidentData.creator
          };
          this.isLoading=false;
    });
  }

  ngOnDestroy(){}
}
