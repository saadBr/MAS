import { Article } from './article.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL=environment.apiUrl+"articles";
@Injectable({providedIn: 'root'})
export class ArticleService {
  private articles: Article[]= [];
  private articleUpdated = new Subject<{articles:Article[],articleCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}

  getArticles(articlesPerSize:number,currentPage:number) {
    const queryParams= `?pagesize=${articlesPerSize}&page=${currentPage}`;
    this.http.get<{message:string;articles:any;maxArticles:number}>
    (BACKEND_URL+queryParams)
    .pipe(
      map((articleData)=>{
        return {
          articles:articleData.articles.map(article=>{
            return {
              designation: article.designation,
              prix: article.prix,
              id: article._id,
              imagePath:article.imagePath,
              creator:article.creator
          };
        }),
        maxArticles:articleData.maxArticles
       };
       })
    )
    .subscribe((transformedData)=>{
      this.articles=transformedData.articles;
      this.articleUpdated.next({
        articles:[...this.articles],
        articleCount:transformedData.maxArticles});
    });
  }

  getArticleUpdateListener() {
    return this.articleUpdated.asObservable();
  }

  getArticle(id:string) {
    return this.http.get<{_id:string;designation:string;prix:number,imagePath:string,creator:string}>(BACKEND_URL+"/"+id);
  }
  addArticle(designation:string,prix:number,image:File) {
    const articleData =  new FormData();
    articleData.append("designation",designation);
    articleData.append("prix",prix+"");
    articleData.append("image",image, designation);
    this.http.post<{message:string, article: Article}>(BACKEND_URL,articleData).subscribe((responseData)=>{
      this.router.navigate(["/admin/article/liste article"]);
    });
  }

  updateArticle(id:string, designation:string,prix:number, image:File | string){
    let articleData:Article | FormData;
    if(typeof(image) === 'object'){
      articleData = new FormData();
      articleData.append("id",id);
      articleData.append("designation",designation);
      articleData.append("prix",prix+"");
      articleData.append("image",image, designation);
    } else{
      articleData = {
        id:id,
        designation:designation,
        prix:prix,
        imagePath:image,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,articleData)
    .subscribe(response=>{
      this.router.navigate(["/admin/article/liste article"]);
    });
  }

  deleteArticle(articleId: string) {
    return this.http
    .delete(BACKEND_URL+"/" + articleId);
  }
}
