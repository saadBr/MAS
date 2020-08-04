import { Palmares } from './palmares.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL=environment.apiUrl+"palmaress";
@Injectable({providedIn: 'root'})
export class PalmaresService {
  private palmaress: Palmares[]= [];
  private palmaresUpdated = new Subject<{palmaress:Palmares[],palmaresCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}



  getPalmaresUpdateListener() {
    return this.palmaresUpdated.asObservable();
  }

  getPalmares(id:string) {
    return this.http.get<{_id:string;contenu:string,imagePath:string,creator:string}>(BACKEND_URL+"/"+id);
  }


  updatePalmares(id:string,contenu:string, image:File | string){
    let palmaresData:Palmares | FormData;
    if(typeof(image) === 'object'){
      palmaresData = new FormData();
      palmaresData.append("id",id);
      palmaresData.append("contenu",contenu);
      palmaresData.append("image",image, "palmares");
    } else{
      palmaresData = {
        id:id,
        contenu:contenu,
        imagePath:image,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,palmaresData)
    .subscribe(response=>{
      this.router.navigate(["/club/palmares"]);
    });
  }

}
