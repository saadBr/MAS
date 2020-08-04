import { NgModule } from '@angular/core';
import { SliderCreateComponent } from './slider-create/slider-create.component';
import { SlidersList } from './slider-list/slider-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[
    SliderCreateComponent,
    SlidersList
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class SliderModule{

}
