import { Component, OnInit, OnDestroy } from "@angular/core";
import { Staff } from '../staff.model';
import { StaffService } from '../staff.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';
@Component({
  selector:'app-staffs-list',
  templateUrl:'./staff-list.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})

export class StaffsList implements OnInit,OnDestroy {
  staffs:Staff[] =  [];
  private staffsSub: Subscription;
  private authSub: Subscription;
  userId:string;
  userIsAuthenticated = true;

  pageSizeOptions=[10,20,50];
  staffPerPage = 10;
  currentPage=1;
  totalStaffs=0;
  constructor(public staffService: StaffService,public authentificationService:AuthentificationServices) {}

  ngOnInit() {

    this.staffService.getStaffs(this.staffPerPage,this.currentPage);
    this.userId=this.authentificationService.getUserId();
    this.staffsSub=this.staffService.getStaffUpdateListener().subscribe((staffData:{staffs:Staff[],staffCount:number})=>{

      this.staffs=staffData.staffs;
      this.totalStaffs=staffData.staffCount;
    });
    this.userIsAuthenticated=this.authentificationService.getIsAuth();
    this.authSub = this.authentificationService.getAuthStatusListnner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.authentificationService.getUserId();
    });
  }

  onChangedPage(pageData:PageEvent) {

    this.currentPage=pageData.pageIndex+1;
    this.staffPerPage=pageData.pageSize;
    this.staffService.getStaffs(this.staffPerPage,this.currentPage);
  }

  onDelete(staffId: string) {

    this.staffService.deleteStaff(staffId).subscribe(()=>{
      this.staffService.getStaffs(this.staffPerPage,this.currentPage);
    }),()=>{

    };
  }

  ngOnDestroy() {
    this.staffsSub.unsubscribe();
    this.authSub.unsubscribe();
  }


}
