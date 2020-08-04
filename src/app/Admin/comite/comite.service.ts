import { Comite } from './comite.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL=environment.apiUrl+"comites";
@Injectable({providedIn: 'root'})
export class ComiteService {
  private comites: Comite[]= [];
  private comiteUpdated = new Subject<{comites:Comite[],comiteCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}

  getComites(comitesPerSize:number,currentPage:number) {
    const queryParams= `?pagesize=${comitesPerSize}&page=${currentPage}`;
    this.http.get<{message:string;comites:any;maxComites:number}>
    (BACKEND_URL+queryParams)
    .pipe(
      map((comiteData)=>{
        return {
          comites:comiteData.comites.map(comite=>{
            return {
              nom: comite.nom,
              role: comite.role,
              id: comite._id,
              imagePath:comite.imagePath,
              creator:comite.creator
          };
        }),
        maxComites:comiteData.maxComites
       };
       })
    )
    .subscribe((transformedData)=>{
      this.comites=transformedData.comites;
      this.comiteUpdated.next({
        comites:[...this.comites],
        comiteCount:transformedData.maxComites});
    });
  }

  getComiteUpdateListener() {
    return this.comiteUpdated.asObservable();
  }

  getComite(id:string) {
    return this.http.get<{_id:string;nom:string;role:string,imagePath:string,creator:string}>(BACKEND_URL+"/"+id);
  }
  addComite(nom:string,role:string,image:File) {
    const comiteData =  new FormData();
    comiteData.append("nom",nom);
    comiteData.append("role",role);
    comiteData.append("image",image, nom);
    this.http.post<{message:string, comite: Comite}>(BACKEND_URL,comiteData).subscribe((responseData)=>{
      this.router.navigate(["/admin/comite/liste comite"]);
    });
  }

  updateComite(id:string, nom:string,role:string, image:File | string){
    let comiteData:Comite | FormData;
    if(typeof(image) === 'object'){
      comiteData = new FormData();
      comiteData.append("id",id);
      comiteData.append("nom",nom);
      comiteData.append("role",role);
      comiteData.append("image",image, nom);
    } else{
      comiteData = {
        id:id,
        nom:nom,
        role:role,
        imagePath:image,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,comiteData)
    .subscribe(response=>{
      this.router.navigate(["/admin/comite/liste comite/"]);
    });
  }

  deleteComite(comiteId: string) {
    return this.http
    .delete(BACKEND_URL+"/" + comiteId);
  }
}
