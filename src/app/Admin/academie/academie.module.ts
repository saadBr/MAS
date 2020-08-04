import { NgModule } from '@angular/core';
import { AcademieCreateComponent } from './academie-create/academie-create.component';
import { AcademiesList } from './academie-list/academie-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[
    AcademieCreateComponent,
    AcademiesList
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class AcademieModule{

}
