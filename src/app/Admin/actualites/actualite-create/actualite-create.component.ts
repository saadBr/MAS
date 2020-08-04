import { Component, OnInit, OnDestroy } from '@angular/core';
import { Actualite } from '../actualite.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActualiteService } from '../actualite.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-actualite-create',
  templateUrl:'./actualite-create.component.html',
  styleUrls:['./actualite-create.component.css','../../../app.component.css','../../admin.component.css']
})
export class ActualiteCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private actualiteId: string;

  form: FormGroup;
  actualite:Actualite;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public actualiteService: ActualiteService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerActualite(){
    if (this.form.invalid){
      return;
    }

    if(this.mode === 'create')
    {
      this.actualiteService.addActualite(this.form.value.titre, this.form.value.contenu.replace(/\n/g, "<br />"),this.form.value.image);
    }
    else{
      this.actualiteService.updateActualite(this.actualiteId,this.form.value.titre, this.form.value.contenu.replace(/\n/g, "<br />"),this.form.value.image);
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
      if(paramMap.has('actualiteId')){
        this.mode='edit';
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
        this.form.setValue({
          titre:this.actualite.titre,
          contenu:this.actualite.contenu,
          image:this.actualite.imagePath
          });
        });
      }else {
        this.mode='create';
        this.actualiteId=null;
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
