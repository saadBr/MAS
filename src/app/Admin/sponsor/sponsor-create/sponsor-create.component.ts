import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sponsor } from '../sponsor.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { SponsorService } from '../sponsor.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-sponsor-create',
  templateUrl:'./sponsor-create.component.html',
  styleUrls:['./sponsor-create.component.css','../../../app.component.css','../../admin.component.css']
})
export class SponsorCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private sponsorId: string;

  form: FormGroup;
  sponsor:Sponsor;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public sponsorService: SponsorService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerSponsor(){
    if (this.form.invalid){
      return;
    }

    if(this.mode === 'create')
    {
      this.sponsorService.addSponsor(this.form.value.nom, this.form.value.image);
    }
    else{
      this.sponsorService.updateSponsor(this.sponsorId,this.form.value.nom, this.form.value.image);
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
      image: new FormControl(null, {validators:[Validators.required],asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('sponsorId')){
        this.mode='edit';
        this.sponsorId=paramMap.get('sponsorId');

        this.sponsorService.getSponsor(this.sponsorId).subscribe(sponsorData=> {

          this.sponsor = {
            id: sponsorData._id,
            nom: sponsorData.nom,
            imagePath:sponsorData.imagePath,
            creator:sponsorData.creator
          };
        this.form.setValue({
          nom:this.sponsor.nom,
          image:this.sponsor.imagePath
          });
        });
      }else {
        this.mode='create';
        this.sponsorId=null;
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
