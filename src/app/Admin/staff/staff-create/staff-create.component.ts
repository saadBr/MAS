import { Component, OnInit, OnDestroy } from '@angular/core';
import { Staff } from '../staff.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { StaffService } from '../staff.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-staff-create',
  templateUrl:'./staff-create.component.html',
  styleUrls:['./staff-create.component.css','../../../app.component.css','../../admin.component.css']
})
export class StaffCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private staffId: string;

  form: FormGroup;
  staff:Staff;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public staffService: StaffService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerStaff(){
    if (this.form.invalid){
      return;
    }

    if(this.mode === 'create')
    {
      this.staffService.addStaff(this.form.value.nom, this.form.value.role,this.form.value.image);
    }
    else{
      this.staffService.updateStaff(this.staffId,this.form.value.nom, this.form.value.role,this.form.value.image);
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
      if(paramMap.has('staffId')){
        this.mode='edit';
        this.staffId=paramMap.get('staffId');

        this.staffService.getStaff(this.staffId).subscribe(staffData=> {

          this.staff = {
            id: staffData._id,
            nom: staffData.nom,
            role:staffData.role,
            imagePath:staffData.imagePath,
            creator:staffData.creator
          };
        this.form.setValue({
          nom:this.staff.nom,
          role:this.staff.role,
          image:this.staff.imagePath
          });
        });
      }else {
        this.mode='create';
        this.staffId=null;
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
