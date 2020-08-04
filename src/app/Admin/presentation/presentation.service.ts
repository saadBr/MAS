import { Presentation } from './presentation.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL=environment.apiUrl+"presentations";
@Injectable({providedIn: 'root'})
export class PresentationService {
  private presentations: Presentation[]= [];
  private presentationUpdated = new Subject<{presentations:Presentation[],presentationCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}


  getPresentationUpdateListener() {
    return this.presentationUpdated.asObservable();
  }

  getPresentation(id:string) {
    return this.http.get<{_id:string;contenu:string,imagePath:string,creator:string}>(BACKEND_URL+"/"+id);
  }


  updatePresentation(id:string, contenu:string, image:File | string){
    let presentationData:Presentation | FormData;
    if(typeof(image) === 'object'){
      presentationData = new FormData();
      presentationData.append("id",id);
      presentationData.append("contenu",contenu);
      presentationData.append("image",image, "motdePresident");
    } else{
      presentationData = {
        id:id,
        contenu:contenu,
        imagePath:image,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,presentationData)
    .subscribe(response=>{
      this.router.navigate(["/equipe pro/presentation"]);
    });
  }

}
