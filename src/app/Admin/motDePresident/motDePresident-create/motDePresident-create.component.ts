import { Component, OnInit, OnDestroy } from '@angular/core';
import { MotDePresident } from '../motDePresident.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MotDePresidentService } from '../motDePresident.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-motDePresident-create',
  templateUrl:'./motDePresident-create.component.html',
  styleUrls:['./motDePresident-create.component.css','../../../app.component.css','../../admin.component.css']
})
export class MotDePresidentCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private motDePresidentId: string;

  form: FormGroup;
  motDePresident:MotDePresident;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public motDePresidentService: MotDePresidentService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerMotDePresident(){
    if (this.form.invalid){
      return;
    }

    this.motDePresidentService.updateMotDePresident(this.motDePresidentId, this.form.value.contenu.replace(/\n/g, "<br />"),this.form.value.image);
    this.form.reset();

  }

  ngOnInit() {
    this.authStatusSub=this.authService
    .getAuthStatusListnner()
    .subscribe(authStatus=>{

    });
    this.form = new FormGroup({
      contenu: new FormControl(null,{validators:[Validators.required]}),
      image: new FormControl(null, {validators:[Validators.required],asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('motDePresidentId')){
        this.mode='edit';
        this.motDePresidentId=paramMap.get('motDePresidentId');

        this.motDePresidentService.getMotDePresident(this.motDePresidentId).subscribe(motDePresidentData=> {

          this.motDePresident = {
            id: motDePresidentData._id,
            contenu:motDePresidentData.contenu,
            imagePath:motDePresidentData.imagePath,
            creator:motDePresidentData.creator
          };
        this.form.setValue({
          contenu:this.motDePresident.contenu,
          image:this.motDePresident.imagePath
          });
        });
      }
    });
  }

  onImagePicked(evnt:Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
