import { Component, OnInit, OnDestroy } from '@angular/core';
import { Academie } from '../academie.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AcademieService } from '../academie.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-academie-create',
  templateUrl:'./academie-create.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})
export class AcademieCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private academieId: string;

  form: FormGroup;
  academie:Academie;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public academieService: AcademieService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerAcademie(){
    if (this.form.invalid){
      return;
    }

    if(this.mode === 'create')
    {
      this.academieService.addAcademie(this.form.value.titre, this.form.value.contenu.replace(/\n/g, "<br />"),this.form.value.image);
    }
    else{
      this.academieService.updateAcademie(this.academieId,this.form.value.titre, this.form.value.contenu.replace(/\n/g, "<br />"),this.form.value.image);
    }
    this.form.reset();

  }

  ngOnInit() {
    this.authStatusSub=this.authService
    .getAuthStatusListnner()
    .subscribe(authStatus=>{

    });
    this.form = new FormGroup({
      titre: new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      contenu: new FormControl(null,{validators:[Validators.required]}),
      image: new FormControl(null, {validators:[Validators.required],asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('academieId')){
        this.mode='edit';
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
        this.form.setValue({
          titre:this.academie.titre,
          contenu:this.academie.contenu,
          image:this.academie.imagePath
          });
        });
      }else {
        this.mode='create';
        this.academieId=null;
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
