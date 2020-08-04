import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations:[
    LoginComponent,
    SignUpComponent
  ],

  imports:[
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthentificationRoutingModule,
    MatIconModule
  ]
})
export class AuthentificationModule {

}
