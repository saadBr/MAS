import {  OnInit, Component, NgModule } from '@angular/core';
import { PhotoService } from 'src/app/Admin/photo/photos.service';
import { Photo } from 'src/app/Admin/photo/photos.model';
import { Subscription } from 'rxjs';


@Component({
  selector:'app-photos',
  templateUrl:'./photos.component.html',
  styleUrls:['./photos.component.css'],

})


export class PhotosComponent implements OnInit {
  photos:Photo[] =  [];
  private photosSub: Subscription;
  photoPerPage = 100;
  currentPage=1;
  totalPhotos=0;
  images = [];
  slideIndex = 0;
  isLoading=true;
  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoService.getPhotos(this.photoPerPage,this.currentPage);
    this.photosSub=this.photoService.getPhotoUpdateListener().subscribe((photoData:{photos:Photo[],photoCount:number})=>{
      this.photos=photoData.photos;
      this.totalPhotos=photoData.photoCount;
      this.isLoading=false;
    });
    }



    openModal() {
      document.getElementById('imgModal').style.display = "block";
    }

    closeModal() {
      document.getElementById('imgModal').style.display = "none";
    }


     plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    }

     currentSlide(n) {
      this.showSlides(this.slideIndex = n);
    }

    showSlides(slideIndex);
     showSlides(n) {
      let i;
      const slides = document.getElementsByClassName("img-slides") as HTMLCollectionOf<HTMLElement>;
      const dots = document.getElementsByClassName("images")as HTMLCollectionOf<HTMLElement>;
      if (n > slides.length) {this.slideIndex = 1}
      if (n < 1) {this.slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex-1].style.display = "block";
      if (dots && dots.length > 0) {
        dots[this.slideIndex-1].className += " active";
      }
    }


}
