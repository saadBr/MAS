import { Component, OnInit, OnDestroy } from '@angular/core';
import { Comite } from '../comite.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ComiteService } from '../comite.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-comite-create',
  templateUrl:'./comite-create.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})
export class ComiteCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private comiteId: string;

  form: FormGroup;
  comite:Comite;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public comiteService: ComiteService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerComite(){
    if (this.form.invalid){
      return;
    }

    if(this.mode === 'create')
    {
      this.comiteService.addComite(this.form.value.nom, this.form.value.role,this.form.value.image);
    }
    else{
      this.comiteService.updateComite(this.comiteId,this.form.value.nom, this.form.value.role,this.form.value.image);
    }
    this.form.reset();

  }

  ngOnInit() {
    this.authStatusSub=this.authService
    .getAuthStatusListnner()
    .subscribe(authStatus=>{

    });
    this.form = new FormGroup({
      nom: new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      role: new FormControl(null,{validators:[Validators.required]}),
      image: new FormControl(null, {validators:[Validators.required],asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('comiteId')){
        this.mode='edit';
        this.comiteId=paramMap.get('comiteId');

        this.comiteService.getComite(this.comiteId).subscribe(comiteData=> {

          this.comite = {
            id: comiteData._id,
            nom: comiteData.nom,
            role:comiteData.role,
            imagePath:comiteData.imagePath,
            creator:comiteData.creator
          };
        this.form.setValue({
          nom:this.comite.nom,
          role:this.comite.role,
          image:this.comite.imagePath
          });
        });
      }else {
        this.mode='create';
        this.comiteId=null;
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
