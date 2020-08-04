import { Slider } from './slider.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL=environment.apiUrl+"sliders";
@Injectable({providedIn: 'root'})
export class SliderService {
  private sliders: Slider[]= [];
  private sliderUpdated = new Subject<{sliders:Slider[],sliderCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}

  getSliders(slidersPerSize:number,currentPage:number) {
    const queryParams= `?pagesize=${slidersPerSize}&page=${currentPage}`;
    this.http.get<{message:string;sliders:any;maxSliders:number}>
    (BACKEND_URL+queryParams)
    .pipe(
      map((sliderData)=>{
        return {
          sliders:sliderData.sliders.map(slider=>{
            return {
              description: slider.description,
              id: slider._id,
              imagePath:slider.imagePath,
              creator:slider.creator
          };
        }),
        maxSliders:sliderData.maxSliders
       };
       })
    )
    .subscribe((transformedData)=>{
      this.sliders=transformedData.sliders;
      this.sliderUpdated.next({
        sliders:[...this.sliders],
        sliderCount:transformedData.maxSliders});
    });
  }

  getSliderUpdateListener() {
    return this.sliderUpdated.asObservable();
  }

  getSlider(id:string) {
    return this.http.get<{_id:string;description:string;imagePath:string,creator:string}>(BACKEND_URL+"/"+id);
  }
  addSlider(description:string,image:File) {
    const sliderData =  new FormData();
    sliderData.append("description",description);
    sliderData.append("image",image, description);
    this.http.post<{message:string, slider: Slider}>(BACKEND_URL,sliderData).subscribe((responseData)=>{
      this.router.navigate(["/admin/slider/liste slider"]);
    });
  }

  updateSlider(id:string, description:string, image:File | string){
    let sliderData:Slider | FormData;
    if(typeof(image) === 'object'){
      sliderData = new FormData();
      sliderData.append("id",id);
      sliderData.append("description",description);
      sliderData.append("image",image, description);
    } else{
      sliderData = {
        id:id,
        description:description,
        imagePath:image,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,sliderData)
    .subscribe(response=>{
      this.router.navigate(["/admin/slider/liste slider/"]);
    });
  }

  deleteSlider(sliderId: string) {
    return this.http
    .delete(BACKEND_URL+"/" + sliderId);
  }
}
