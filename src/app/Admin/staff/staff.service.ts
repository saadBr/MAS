import { Staff } from './staff.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL=environment.apiUrl+"staffs";
@Injectable({providedIn: 'root'})
export class StaffService {
  private staffs: Staff[]= [];
  private staffUpdated = new Subject<{staffs:Staff[],staffCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}

  getStaffs(staffsPerSize:number,currentPage:number) {
    const queryParams= `?pagesize=${staffsPerSize}&page=${currentPage}`;
    this.http.get<{message:string;staffs:any;maxStaffs:number}>
    (BACKEND_URL+queryParams)
    .pipe(
      map((staffData)=>{
        return {
          staffs:staffData.staffs.map(staff=>{
            return {
              nom: staff.nom,
              role: staff.role,
              id: staff._id,
              imagePath:staff.imagePath,
              creator:staff.creator
          };
        }),
        maxStaffs:staffData.maxStaffs
       };
       })
    )
    .subscribe((transformedData)=>{
      this.staffs=transformedData.staffs;
      this.staffUpdated.next({
        staffs:[...this.staffs],
        staffCount:transformedData.maxStaffs});
    });
  }

  getStaffUpdateListener() {
    return this.staffUpdated.asObservable();
  }

  getStaff(id:string) {
    return this.http.get<{_id:string;nom:string;role:string,imagePath:string,creator:string}>(BACKEND_URL+"/"+id);
  }
  addStaff(nom:string,role:string,image:File) {
    const staffData =  new FormData();
    staffData.append("nom",nom);
    staffData.append("role",role);
    staffData.append("image",image, nom);
    this.http.post<{message:string, staff: Staff}>(BACKEND_URL,staffData).subscribe((responseData)=>{
      this.router.navigate(["/admin/staff/liste staff"]);
    });
  }

  updateStaff(id:string, nom:string,role:string, image:File | string){
    let staffData:Staff | FormData;
    if(typeof(image) === 'object'){
      staffData = new FormData();
      staffData.append("id",id);
      staffData.append("nom",nom);
      staffData.append("role",role);
      staffData.append("image",image, nom);
    } else{
      staffData = {
        id:id,
        nom:nom,
        role:role,
        imagePath:image,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,staffData)
    .subscribe(response=>{
      this.router.navigate(["/admin/staff/liste staff/"]);
    });
  }

  deleteStaff(staffId: string) {
    return this.http
    .delete(BACKEND_URL+"/" + staffId);
  }
}
