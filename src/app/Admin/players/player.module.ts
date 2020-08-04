import { NgModule } from '@angular/core';
import { PlayerCreateComponent } from './player-create/player-create.component';
import { PlayersList } from './players-list/players-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[
    PlayerCreateComponent,
    PlayersList
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class PlayerModule{

}
