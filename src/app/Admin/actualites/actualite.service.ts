import { Actualite } from './actualite.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Local } from 'protractor/built/driverProviders';
const BACKEND_URL=environment.apiUrl+"actualites";
@Injectable({providedIn: 'root'})
export class ActualiteService {
  private actualites: Actualite[]= [];
  private actualiteUpdated = new Subject<{actualites:Actualite[],actualiteCount:number}>();
  date = new Date();
  FormatedDate = this.date.getDay()+"/"+this.date.getMonth()+"/"+this.date.getFullYear;
  constructor(private http: HttpClient, private router:Router) {}

  getActualites(actualitesPerSize:number,currentPage:number) {
    const queryParams= `?pagesize=${actualitesPerSize}&page=${currentPage}`;
    this.http.get<{message:string;actualites:any;maxActualites:number}>
    (BACKEND_URL+queryParams)
    .pipe(
      map((actualiteData)=>{
        return {
          actualites:actualiteData.actualites.map(actualite=>{
            return {
              titre: actualite.titre,
              contenu: actualite.contenu,
              id: actualite._id,
              imagePath:actualite.imagePath,
              date:actualite.date,
              creator:actualite.creator
          };
        }),
        maxActualites:actualiteData.maxActualites
       };
       })
    )
    .subscribe((transformedData)=>{
      this.actualites=transformedData.actualites;
      this.actualiteUpdated.next({
        actualites:[...this.actualites],
        actualiteCount:transformedData.maxActualites});
    });
  }

  getActualiteUpdateListener() {
    return this.actualiteUpdated.asObservable();
  }

  getActualite(id:string) {
    return this.http.get<{_id:string;titre:string;contenu:string,imagePath:string,date:Date,creator:string}>(BACKEND_URL+"/"+id);
  }
  addActualite(titre:string,contenu:string,image:File) {
    const actualiteData =  new FormData();
    actualiteData.append("titre",titre);
    actualiteData.append("contenu",contenu);
    actualiteData.append("image",image, titre);
    actualiteData.append("date",this.FormatedDate);
    this.http.post<{message:string, actualite: Actualite}>(BACKEND_URL,actualiteData).subscribe((responseData)=>{
      this.router.navigate(["/admin/actualite/liste actualite"]);
    });
  }

  updateActualite(id:string, titre:string,contenu:string, image:File | string){
    let actualiteData:Actualite | FormData;
    if(typeof(image) === 'object'){
      actualiteData = new FormData();
      actualiteData.append("id",id);
      actualiteData.append("titre",titre);
      actualiteData.append("contenu",contenu);
      actualiteData.append("image",image, titre);
    } else{
      actualiteData = {
        id:id,
        titre:titre,
        contenu:contenu,
        imagePath:image,
        date:null,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,actualiteData)
    .subscribe(response=>{
      this.router.navigate(["/admin/actualite/liste actualite/"]);
    });
  }

  deleteActualite(actualiteId: string) {
    return this.http
    .delete(BACKEND_URL+"/" + actualiteId);
  }
}
