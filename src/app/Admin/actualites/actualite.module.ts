import { NgModule } from '@angular/core';
import { ActualiteCreateComponent } from './actualite-create/actualite-create.component';
import { ActualitesList } from './actualite-list/actualite-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[
    ActualiteCreateComponent,
    ActualitesList
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class ActualiteModule{

}
