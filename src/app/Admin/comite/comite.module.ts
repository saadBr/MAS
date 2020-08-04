import { NgModule } from '@angular/core';
import { ComiteCreateComponent } from './comite-create/comite-create.component';
import { ComitesList } from './comite-list/comite-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[
    ComiteCreateComponent,
    ComitesList
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class ComiteModule{

}
