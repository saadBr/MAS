import { Photo } from './photos.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL=environment.apiUrl+"photos";
@Injectable({providedIn: 'root'})
export class PhotoService {
  private photos: Photo[]= [];
  private photoUpdated = new Subject<{photos:Photo[],photoCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}

  getPhotos(photosPerSize:number,currentPage:number) {
    const queryParams= `?pagesize=${photosPerSize}&page=${currentPage}`;
    this.http.get<{message:string;photos:any;maxPhotos:number}>
    (BACKEND_URL+queryParams)
    .pipe(
      map((photoData)=>{
        return {
          photos:photoData.photos.map(photo=>{
            return {
              description: photo.description,
              id: photo._id,
              imagePath:photo.imagePath,
              creator:photo.creator
          };
        }),
        maxPhotos:photoData.maxPhotos
       };
       })
    )
    .subscribe((transformedData)=>{
      this.photos=transformedData.photos;
      this.photoUpdated.next({
        photos:[...this.photos],
        photoCount:transformedData.maxPhotos});
    });
  }

  getPhotoUpdateListener() {
    return this.photoUpdated.asObservable();
  }

  getPhoto(id:string) {
    return this.http.get<{_id:string;description:string;imagePath:string,creator:string}>(BACKEND_URL+"/"+id);
  }
  addPhoto(description:string,image:File) {
    const photoData =  new FormData();
    photoData.append("description",description);
    photoData.append("image",image, description);
    this.http.post<{message:string, photo: Photo}>(BACKEND_URL,photoData).subscribe((responseData)=>{
      this.router.navigate(["/admin/photo/liste photo"]);
    });
  }

  updatePhoto(id:string, description:string, image:File | string){
    let photoData:Photo | FormData;
    if(typeof(image) === 'object'){
      photoData = new FormData();
      photoData.append("id",id);
      photoData.append("description",description);
      photoData.append("image",image, description);
    } else{
      photoData = {
        id:id,
        description:description,
        imagePath:image,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,photoData)
    .subscribe(response=>{
      this.router.navigate(["/admin/photo/liste photo/"]);
    });
  }

  deletePhoto(photoId: string) {
    return this.http
    .delete(BACKEND_URL+"/" + photoId);
  }
}
