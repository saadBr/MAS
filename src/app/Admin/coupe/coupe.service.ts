import { Coupe } from './coupe.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL=environment.apiUrl+"coupes";
@Injectable({providedIn: 'root'})
export class CoupeService {
  private coupes: Coupe[]= [];
  private coupeUpdated = new Subject<{coupes:Coupe[],coupeCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}

  getCoupes(coupesPerSize:number,currentPage:number) {
    const queryParams= `?pagesize=${coupesPerSize}&page=${currentPage}`;
    this.http.get<{message:string;coupes:any;maxCoupes:number}>
    (BACKEND_URL+queryParams)
    .pipe(
      map((coupeData)=>{
        return {
          coupes:coupeData.coupes.map(coupe=>{
            return {
              titre: coupe.titre,
              nombre: coupe.nombre,
              id: coupe._id,
              imagePath:coupe.imagePath,
              creator:coupe.creator
          };
        }),
        maxCoupes:coupeData.maxCoupes
       };
       })
    )
    .subscribe((transformedData)=>{
      this.coupes=transformedData.coupes;
      this.coupeUpdated.next({
        coupes:[...this.coupes],
        coupeCount:transformedData.maxCoupes});
    });
  }

  getCoupeUpdateListener() {
    return this.coupeUpdated.asObservable();
  }

  getCoupe(id:string) {
    return this.http.get<{_id:string;titre:string;nombre:number,imagePath:string,creator:string}>(BACKEND_URL+"/"+id);
  }
  addCoupe(titre:string,nombre:number,image:File) {
    const coupeData =  new FormData();
    coupeData.append("titre",titre);
    coupeData.append("nombre",nombre+"");
    coupeData.append("image",image, titre);
    this.http.post<{message:string, coupe: Coupe}>(BACKEND_URL,coupeData).subscribe((responseData)=>{
      this.router.navigate(["/admin/coupe/liste coupe"]);
    });
  }

  updateCoupe(id:string, titre:string,nombre:number, image:File | string){
    let coupeData:Coupe | FormData;
    if(typeof(image) === 'object'){
      coupeData = new FormData();
      coupeData.append("id",id);
      coupeData.append("titre",titre);
      coupeData.append("nombre",nombre+"");
      coupeData.append("image",image, titre);
    } else{
      coupeData = {
        id:id,
        titre:titre,
        nombre:nombre,
        imagePath:image,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,coupeData)
    .subscribe(response=>{
      this.router.navigate(["/admin/coupe/liste coupe/"]);
    });
  }

  deleteCoupe(coupeId: string) {
    return this.http
    .delete(BACKEND_URL+"/" + coupeId);
  }
}
