import { NgModule } from '@angular/core';
import { MotDePresidentCreateComponent } from './motDePresident-create/motDePresident-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[
    MotDePresidentCreateComponent,
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class MotDePresidentModule{

}
