import { Component, OnInit, OnDestroy } from '@angular/core';
import { Slider } from '../slider.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { SliderService } from '../slider.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-slider-create',
  templateUrl:'./slider-create.component.html',
  styleUrls:['./slider-create.component.css','../../../app.component.css','../../admin.component.css']
})
export class SliderCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private sliderId: string;

  form: FormGroup;
  slider:Slider;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public sliderService: SliderService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerSlider(){
    if (this.form.invalid){
      return;
    }

    if(this.mode === 'create')
    {
      this.sliderService.addSlider(this.form.value.description, this.form.value.image);
    }
    else{
      this.sliderService.updateSlider(this.sliderId,this.form.value.description, this.form.value.image);
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
      if(paramMap.has('sliderId')){
        this.mode='edit';
        this.sliderId=paramMap.get('sliderId');

        this.sliderService.getSlider(this.sliderId).subscribe(sliderData=> {

          this.slider = {
            id: sliderData._id,
            description: sliderData.description,
            imagePath:sliderData.imagePath,
            creator:sliderData.creator
          };
        this.form.setValue({
          description:this.slider.description,
          image:this.slider.imagePath
          });
        });
      }else {
        this.mode='create';
        this.sliderId=null;
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
