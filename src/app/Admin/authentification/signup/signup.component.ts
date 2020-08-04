import {Component, OnInit, OnDestroy} from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthentificationServices } from '../authentification.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl:'./signup.component.html',
  styleUrls:['./signup.component.css']
})
export class SignUpComponent implements OnInit,OnDestroy{

  private authStateSub:Subscription;
  constructor(public authentificationService: AuthentificationServices){}

  ngOnInit(){
    this.authStateSub=this.authentificationService.getAuthStatusListnner().subscribe(
    authStatus=>{

    });
  }
  onSignUp(form: NgForm){
    if(form.invalid){
      return;
    }

    this.authentificationService.createUser(form.value.email,form.value.password);
  }

  ngOnDestroy(){
    this.authStateSub.unsubscribe();
  }
}
