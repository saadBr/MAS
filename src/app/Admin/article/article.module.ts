import { NgModule } from '@angular/core';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticlesList } from './articles-list/article-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[
    ArticleCreateComponent,
    ArticlesList
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class ArticleModule{

}
