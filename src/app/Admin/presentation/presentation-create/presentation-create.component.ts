import { Component, OnInit, OnDestroy } from '@angular/core';
import { Presentation } from '../presentation.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PresentationService } from '../presentation.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-presentation-create',
  templateUrl:'./presentation-create.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})
export class PresentationCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private presentationId: string;

  form: FormGroup;
  presentation:Presentation;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public presentationService: PresentationService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerPresentation(){
    if (this.form.invalid){
      return;
    }

    this.presentationService.updatePresentation(this.presentationId, this.form.value.contenu.replace(/\n/g, "<br />"),this.form.value.image);
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
      if(paramMap.has('presentationId')){
        this.mode='edit';
        this.presentationId=paramMap.get('presentationId');

        this.presentationService.getPresentation(this.presentationId).subscribe(presentationData=> {

          this.presentation = {
            id: presentationData._id,
            contenu:presentationData.contenu,
            imagePath:presentationData.imagePath,
            creator:presentationData.creator
          };
        this.form.setValue({
          contenu:this.presentation.contenu,
          image:this.presentation.imagePath
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
