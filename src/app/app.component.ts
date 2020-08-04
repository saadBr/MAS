import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {  Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationStart } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AccueilComponent } from './public/Accueil/accueil.component';
import { findIndex } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'MAS';
  isAdmin = false
  login = false;
  isLoading;
  loadingStatusSub:Subscription;
  constructor(private router: Router,public accueil:AccueilComponent){
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Could add more chars url:path?=;other possible
        const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
        let currentUrlPath = event.url.slice(1).split(urlDelimitators)[0];
        if(currentUrlPath.includes("admin") && event.url.slice(1).split(urlDelimitators)[2].includes("login")){this.login=true;this.isAdmin=true;}
        else if(currentUrlPath.includes("admin")) {this.isAdmin=true;this.login=false;}
        else{this.isAdmin=false}
      }
    });
  }


  ngOnInit(){
  }

  ngOnDestroy(){
    this.loadingStatusSub.unsubscribe();
  }
}
