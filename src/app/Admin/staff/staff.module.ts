import { NgModule } from '@angular/core';
import { StaffCreateComponent } from './staff-create/staff-create.component';
import { StaffsList } from './staff-list/staff-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[
    StaffCreateComponent,
    StaffsList
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class StaffModule{

}
