import { Component, OnInit, OnDestroy } from '@angular/core';
import { Coupe } from '../coupe.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { CoupeService } from '../coupe.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-coupe-create',
  templateUrl:'./coupe-create.component.html',
  styleUrls:['./coupe-create.component.css','../../../app.component.css','../../admin.component.css']
})
export class CoupeCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private coupeId: string;

  form: FormGroup;
  coupe:Coupe;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public coupeService: CoupeService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrergistrerCoupe(){
    if (this.form.invalid){
      return;
    }

    if(this.mode === 'create')
    {
      this.coupeService.addCoupe(this.form.value.titre, this.form.value.nombre,this.form.value.image);
    }
    else{
      this.coupeService.updateCoupe(this.coupeId,this.form.value.titre, this.form.value.nombre,this.form.value.image);
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
      nombre: new FormControl(null,{validators:[Validators.required]}),
      image: new FormControl(null, {validators:[Validators.required],asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('coupeId')){
        this.mode='edit';
        this.coupeId=paramMap.get('coupeId');

        this.coupeService.getCoupe(this.coupeId).subscribe(coupeData=> {

          this.coupe = {
            id: coupeData._id,
            titre: coupeData.titre,
            nombre:coupeData.nombre,
            imagePath:coupeData.imagePath,
            creator:coupeData.creator
          };
        this.form.setValue({
          titre:this.coupe.titre,
          nombre:this.coupe.nombre,
          image:this.coupe.imagePath
          });
        });
      }else {
        this.mode='create';
        this.coupeId=null;
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
