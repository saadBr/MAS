import { Academie } from './academie.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Local } from 'protractor/built/driverProviders';
const BACKEND_URL=environment.apiUrl+"academies";
@Injectable({providedIn: 'root'})
export class AcademieService {
  private academies: Academie[]= [];
  private academieUpdated = new Subject<{academies:Academie[],academieCount:number}>();
  date = new Date();
  FormatedDate = this.date.getDay()+"/"+this.date.getMonth()+"/"+this.date.getFullYear;
  constructor(private http: HttpClient, private router:Router) {}

  getAcademies(academiesPerSize:number,currentPage:number) {
    const queryParams= `?pagesize=${academiesPerSize}&page=${currentPage}`;
    this.http.get<{message:string;academies:any;maxAcademies:number}>
    (BACKEND_URL+queryParams)
    .pipe(
      map((academieData)=>{
        return {
          academies:academieData.academies.map(academie=>{
            return {
              titre: academie.titre,
              contenu: academie.contenu,
              id: academie._id,
              imagePath:academie.imagePath,
              date:academie.date,
              creator:academie.creator
          };
        }),
        maxAcademies:academieData.maxAcademies
       };
       })
    )
    .subscribe((transformedData)=>{
      this.academies=transformedData.academies;
      this.academieUpdated.next({
        academies:[...this.academies],
        academieCount:transformedData.maxAcademies});
    });
  }

  getAcademieUpdateListener() {
    return this.academieUpdated.asObservable();
  }

  getAcademie(id:string) {
    return this.http.get<{_id:string;titre:string;contenu:string,imagePath:string,date:Date,creator:string}>(BACKEND_URL+"/"+id);
  }
  addAcademie(titre:string,contenu:string,image:File) {
    const academieData =  new FormData();
    academieData.append("titre",titre);
    academieData.append("contenu",contenu);
    academieData.append("image",image, titre);
    academieData.append("date",this.FormatedDate);
    this.http.post<{message:string, academie: Academie}>(BACKEND_URL,academieData).subscribe((responseData)=>{
      this.router.navigate(["/admin/academie/liste academie"]);
    });
  }

  updateAcademie(id:string, titre:string,contenu:string, image:File | string){
    let academieData:Academie | FormData;
    if(typeof(image) === 'object'){
      academieData = new FormData();
      academieData.append("id",id);
      academieData.append("titre",titre);
      academieData.append("contenu",contenu);
      academieData.append("image",image, titre);
    } else{
      academieData = {
        id:id,
        titre:titre,
        contenu:contenu,
        imagePath:image,
        date:null,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,academieData)
    .subscribe(response=>{
      this.router.navigate(["/admin/academie/liste academie/"]);
    });
  }

  deleteAcademie(academieId: string) {
    return this.http
    .delete(BACKEND_URL+"/" + academieId);
  }
}
