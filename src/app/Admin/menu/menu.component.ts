import { OnDestroy, OnInit, Component, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from '../authentification/authentification.service';

@Component({
  selector:'app-menu',
  templateUrl:'./menu.component.html',
  styleUrls:['./menu.component.css']
})
export class MenuComponent implements OnInit,OnDestroy {
  constructor(private authentifactionService:AuthentificationServices,iconRegistry:MatIconRegistry, sanitizer:DomSanitizer ,@Inject(DOCUMENT) document){
    iconRegistry.addSvgIcon('MAS',sanitizer.bypassSecurityTrustResourceUrl('../assets/logo.svg'));
  }
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  ngOnInit(){
    this.userIsAuthenticated=this.authentifactionService.getIsAuth();
    this.authListenerSubs=this.authentifactionService.getAuthStatusListnner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
    });
  }
  onLogout(){
    this.authentifactionService.logout();
  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }


}
