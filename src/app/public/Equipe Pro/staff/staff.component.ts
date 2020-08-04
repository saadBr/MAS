import { OnDestroy, OnInit, Component } from '@angular/core';
import { StaffService } from 'src/app/Admin/staff/staff.service';
import { Subscription } from 'rxjs';
import { Staff } from 'src/app/Admin/staff/staff.model';



@Component({
  selector:'app-staff',
  templateUrl:'./staff.component.html',
  styleUrls:['./staff.component.css']
})
export class StaffComponent implements OnInit,OnDestroy {
  staffs:Staff[] =  [];
  private staffsSub: Subscription;
  staffPerPage = 10;
  currentPage=1;
  totalStaffs=0;
  isLoading=true;
  constructor(public staffService: StaffService){}
  ngOnInit(){
    this.staffService.getStaffs(this.staffPerPage,this.currentPage);
    this.staffsSub=this.staffService.getStaffUpdateListener().subscribe((staffData:{staffs:Staff[],staffCount:number})=>{
      this.staffs=staffData.staffs;
      this.totalStaffs=staffData.staffCount;
      this.isLoading=false;
    });
  }

  ngOnDestroy(){
    this.staffsSub.unsubscribe();
  }
}
