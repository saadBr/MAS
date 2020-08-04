import { Component, OnInit, OnDestroy } from "@angular/core";
import { Article } from '../article.model';
import { ArticleService } from '../article.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';
@Component({
  selector:'app-articles-list',
  templateUrl:'./article-list.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})

export class ArticlesList implements OnInit,OnDestroy {
  articles:Article[] =  [];
  private articlesSub: Subscription;
  private authSub: Subscription;
  userId:string;
  userIsAuthenticated = true;

  pageSizeOptions=[10,20,50];
  articlePerPage = 10;
  currentPage=1;
  totalArticles=0;
  constructor(public articleService: ArticleService,public authentificationService:AuthentificationServices) {}

  ngOnInit() {

    this.articleService.getArticles(this.articlePerPage,this.currentPage);
    this.userId=this.authentificationService.getUserId();
    this.articlesSub=this.articleService.getArticleUpdateListener().subscribe((articleData:{articles:Article[],articleCount:number})=>{

      this.articles=articleData.articles;
      this.totalArticles=articleData.articleCount;
    });
    this.userIsAuthenticated=this.authentificationService.getIsAuth();
    this.authSub = this.authentificationService.getAuthStatusListnner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.authentificationService.getUserId();
    });
  }

  onChangedPage(pageData:PageEvent) {

    this.currentPage=pageData.pageIndex+1;
    this.articlePerPage=pageData.pageSize;
    this.articleService.getArticles(this.articlePerPage,this.currentPage);
  }

  onDelete(articleId: string) {

    this.articleService.deleteArticle(articleId).subscribe(()=>{
      this.articleService.getArticles(this.articlePerPage,this.currentPage);
    }),()=>{

    };
  }

  ngOnDestroy() {
    this.articlesSub.unsubscribe();
    this.authSub.unsubscribe();
  }

}
