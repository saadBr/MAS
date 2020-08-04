import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthentificationServices } from '../authentification.service';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css','../../../app.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{

  private authStateSub:Subscription;
  constructor(public authenticationService:AuthentificationServices,iconRegistry:MatIconRegistry, sanitizer:DomSanitizer ,@Inject(DOCUMENT) document){
    iconRegistry.addSvgIcon('MAS',sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/logo.svg'))}
  ngOnInit(){
    this.authStateSub=this.authenticationService.getAuthStatusListnner().subscribe(
    authStatus=>{

    });
  }

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authenticationService.login(form.value.email,form.value.password);
    form.resetForm();
  }

  ngOnDestroy(){
    this.authStateSub.unsubscribe();
  }
}
