import { OnDestroy, OnInit, Component } from '@angular/core';
import { ArticleService } from 'src/app/Admin/article/article.service';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/Admin/article/article.model';



@Component({
  selector:'app-article',
  templateUrl:'./article.component.html',
  styleUrls:['./article.component.css']
})
export class ArticleComponent implements OnInit,OnDestroy {
  articles:Article[] =  [];
  private articlesSub: Subscription;
  articlePerPage = 50;
  currentPage=1;
  totalArticles=0;
  isLoading=true;
  constructor(public articleService: ArticleService){}
  ngOnInit(){
    this.articleService.getArticles(this.articlePerPage,this.currentPage);
    this.articlesSub=this.articleService.getArticleUpdateListener().subscribe((articleData:{articles:Article[],articleCount:number})=>{
      this.articles=articleData.articles;
      this.totalArticles=articleData.articleCount;
      this.isLoading=false;
    });
  }

  ngOnDestroy(){
    this.articlesSub.unsubscribe();
  }
}
