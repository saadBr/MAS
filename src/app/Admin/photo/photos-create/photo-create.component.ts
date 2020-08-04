import { Component, OnInit, OnDestroy } from '@angular/core';
import { Photo } from '../photos.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PhotoService } from '../photos.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-photo-create',
  templateUrl:'./photo-create.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})
export class PhotoCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private photoId: string;

  form: FormGroup;
  photo:Photo;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public photoService: PhotoService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerPhoto(){
    if (this.form.invalid){
      return;
    }

    if(this.mode === 'create')
    {
      this.photoService.addPhoto(this.form.value.description, this.form.value.image);
    }
    else{
      this.photoService.updatePhoto(this.photoId,this.form.value.description, this.form.value.image);
    }
    this.form.reset();

  }

  ngOnInit() {
    this.authStatusSub=this.authService
    .getAuthStatusListnner()
    .subscribe(authStatus=>{

    });
    this.form = new FormGroup({
      description: new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      image: new FormControl(null, {validators:[Validators.required],asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('photoId')){
        this.mode='edit';
        this.photoId=paramMap.get('photoId');

        this.photoService.getPhoto(this.photoId).subscribe(photoData=> {

          this.photo = {
            id: photoData._id,
            description: photoData.description,
            imagePath:photoData.imagePath,
            creator:photoData.creator
          };
        this.form.setValue({
          description:this.photo.description,
          image:this.photo.imagePath
          });
        });
      }else {
        this.mode='create';
        this.photoId=null;
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
