import { NgModule } from '@angular/core';
import { CoupeCreateComponent } from './coupe-create/coupe-create.component';
import { CoupesList } from './coupe-list/coupe-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[
    CoupeCreateComponent,
    CoupesList
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class CoupeModule{

}
