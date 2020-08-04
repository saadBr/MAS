import { NgModule } from '@angular/core';
import { PhotoCreateComponent } from './photos-create/photo-create.component';
import { PhotosList } from './photos-list/photo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[
    PhotoCreateComponent,
    PhotosList
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class PhotoModule{

}
