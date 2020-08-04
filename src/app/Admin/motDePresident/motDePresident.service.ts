import { MotDePresident } from './motDePresident.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL=environment.apiUrl+"motDePresidents";
@Injectable({providedIn: 'root'})
export class MotDePresidentService {
  private motDePresidents: MotDePresident[]= [];
  private motDePresidentUpdated = new Subject<{motDePresidents:MotDePresident[],motDePresidentCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}


  getMotDePresidentUpdateListener() {
    return this.motDePresidentUpdated.asObservable();
  }

  getMotDePresident(id:string) {
    return this.http.get<{_id:string;contenu:string,imagePath:string,creator:string}>(BACKEND_URL+"/"+id);
  }


  updateMotDePresident(id:string, contenu:string, image:File | string){
    let motDePresidentData:MotDePresident | FormData;
    if(typeof(image) === 'object'){
      motDePresidentData = new FormData();
      motDePresidentData.append("id",id);
      motDePresidentData.append("contenu",contenu);
      motDePresidentData.append("image",image, "motdePresident");
    } else{
      motDePresidentData = {
        id:id,
        contenu:contenu,
        imagePath:image,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,motDePresidentData)
    .subscribe(response=>{
      this.router.navigate(["/club/mot de president"]);
    });
  }


}
