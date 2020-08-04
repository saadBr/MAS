import { Sponsor } from './sponsor.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL=environment.apiUrl+"sponsors";
@Injectable({providedIn: 'root'})
export class SponsorService {
  private sponsors: Sponsor[]= [];
  private sponsorUpdated = new Subject<{sponsors:Sponsor[],sponsorCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}

  getSponsors(sponsorsPerSize:number,currentPage:number) {
    const queryParams= `?pagesize=${sponsorsPerSize}&page=${currentPage}`;
    this.http.get<{message:string;sponsors:any;maxSponsors:number}>
    (BACKEND_URL+queryParams)
    .pipe(
      map((sponsorData)=>{
        return {
          sponsors:sponsorData.sponsors.map(sponsor=>{
            return {
              nom: sponsor.nom,
              id: sponsor._id,
              imagePath:sponsor.imagePath,
              creator:sponsor.creator
          };
        }),
        maxSponsors:sponsorData.maxSponsors
       };
       })
    )
    .subscribe((transformedData)=>{
      this.sponsors=transformedData.sponsors;
      this.sponsorUpdated.next({
        sponsors:[...this.sponsors],
        sponsorCount:transformedData.maxSponsors});
    });
  }

  getSponsorUpdateListener() {
    return this.sponsorUpdated.asObservable();
  }

  getSponsor(id:string) {
    return this.http.get<{_id:string;nom:string;imagePath:string,creator:string}>(BACKEND_URL+"/"+id);
  }
  addSponsor(nom:string,image:File) {
    const sponsorData =  new FormData();
    sponsorData.append("nom",nom);
    sponsorData.append("image",image, nom);
    this.http.post<{message:string, sponsor: Sponsor}>(BACKEND_URL,sponsorData).subscribe((responseData)=>{
      this.router.navigate(["/admin/sponsor/liste sponsor"]);
    });
  }

  updateSponsor(id:string, nom:string, image:File | string){
    let sponsorData:Sponsor | FormData;
    if(typeof(image) === 'object'){
      sponsorData = new FormData();
      sponsorData.append("id",id);
      sponsorData.append("nom",nom);
      sponsorData.append("image",image, nom);
    } else{
      sponsorData = {
        id:id,
        nom:nom,
        imagePath:image,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,sponsorData)
    .subscribe(response=>{
      this.router.navigate(["/admin/sponsor/liste sponsor/"]);
    });
  }

  deleteSponsor(sponsorId: string) {
    return this.http
    .delete(BACKEND_URL+"/" + sponsorId);
  }
}
