import { Component, OnInit, OnDestroy } from "@angular/core";
import { Photo } from '../photos.model';
import { PhotoService } from '../photos.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';
@Component({
  selector:'app-photos-list',
  templateUrl:'./photo-list.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})

export class PhotosList implements OnInit,OnDestroy {
  photos:Photo[] =  [];
  private photosSub: Subscription;
  pageSizeOptions=[10,20,50];
  photoPerPage = 10;
  currentPage=1;
  totalPhotos=0;
  private authSub: Subscription;
  userId:string;
  userIsAuthenticated = true;

  constructor(public photoService: PhotoService,public authentificationService:AuthentificationServices) {}

  ngOnInit() {

    this.userId=this.authentificationService.getUserId();
    this.photoService.getPhotos(this.photoPerPage,this.currentPage);
    this.photosSub=this.photoService.getPhotoUpdateListener().subscribe((photoData:{photos:Photo[],photoCount:number})=>{

      this.photos=photoData.photos;
      this.totalPhotos=photoData.photoCount;
    });
    this.userIsAuthenticated=this.authentificationService.getIsAuth();
    this.authSub = this.authentificationService.getAuthStatusListnner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.authentificationService.getUserId();
    });
  }

  onChangedPage(pageData:PageEvent) {

    this.currentPage=pageData.pageIndex+1;
    this.photoPerPage=pageData.pageSize;
    this.photoService.getPhotos(this.photoPerPage,this.currentPage);
  }

  onDelete(photoId: string) {

    this.photoService.deletePhoto(photoId).subscribe(()=>{
      this.photoService.getPhotos(this.photoPerPage,this.currentPage);
    }),()=>{

    };
  }

  ngOnDestroy() {
    this.photosSub.unsubscribe();
    this.authSub.unsubscribe();
  }


}
