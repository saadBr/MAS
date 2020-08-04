import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../article.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-article-create',
  templateUrl:'./article-create.component.html',
  styleUrls:['./article-create.component.css','../../../app.component.css','../../admin.component.css']
})
export class ArticleCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private articleId: string;

  form: FormGroup;
  article:Article;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerArticle(){
    if (this.form.invalid){
      return;
    }

    if(this.mode === 'create')
    {
      console.log(this.form.value.designation);
      this.articleService.addArticle(this.form.value.designation, this.form.value.prix,this.form.value.image);
    }
    else{
      this.articleService.updateArticle(this.articleId,this.form.value.designation, this.form.value.prix,this.form.value.image);
    }
    this.form.reset();

  }

  ngOnInit() {
    this.authStatusSub=this.authService
    .getAuthStatusListnner()
    .subscribe(authStatus=>{

    });
    this.form = new FormGroup({
      designation: new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      prix: new FormControl(null,{validators:[Validators.required]}),
      image: new FormControl(null, {validators:[Validators.required],asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('articleId')){
        this.mode='edit';
        this.articleId=paramMap.get('articleId');

        this.articleService.getArticle(this.articleId).subscribe(articleData=> {

          this.article = {
            id: articleData._id,
            designation: articleData.designation,
            prix:articleData.prix,
            imagePath:articleData.imagePath,
            creator:articleData.creator
          };
        this.form.setValue({
          designation:this.article.designation,
          prix:this.article.prix,
          image:this.article.imagePath
          });
        });
      }else {
        this.mode='create';
        this.articleId=null;
      }
    });
  }

  onImagePicked(evnt:Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
