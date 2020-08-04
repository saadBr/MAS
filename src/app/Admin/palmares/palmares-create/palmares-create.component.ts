import { Component, OnInit, OnDestroy } from '@angular/core';
import { Palmares } from '../palmares.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PalmaresService } from '../palmares.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-palmares-create',
  templateUrl:'./palmares-create.component.html',
  styleUrls:['./palmares-create.component.css','../../../app.component.css','../../admin.component.css']
})
export class PalmaresCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private palmaresId: string;

  form: FormGroup;
  palmares:Palmares;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public palmaresService: PalmaresService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerPalmares(){
    if (this.form.invalid){
      return;
    }

    this.palmaresService.updatePalmares(this.palmaresId,this.form.value.contenu.replace(/\n/g, "<br />"),this.form.value.image);
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
      if(paramMap.has('palmaresId')){
        this.mode='edit';
        this.palmaresId=paramMap.get('palmaresId');

        this.palmaresService.getPalmares(this.palmaresId).subscribe(palmaresData=> {

          this.palmares = {
            id: palmaresData._id,
            contenu:palmaresData.contenu,
            imagePath:palmaresData.imagePath,
            creator:palmaresData.creator
          };
        this.form.setValue({
          contenu:this.palmares.contenu,
          image:this.palmares.imagePath
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
