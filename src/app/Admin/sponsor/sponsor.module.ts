import { NgModule } from '@angular/core';
import { SponsorCreateComponent } from './sponsor-create/sponsor-create.component';
import { SponsorsList } from './sponsor-list/sponsor-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[
    SponsorCreateComponent,
    SponsorsList
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class SponsorModule{

}
