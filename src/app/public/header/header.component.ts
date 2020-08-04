import { OnDestroy, OnInit, Component, Inject, HostListener } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector:'app-header',
  templateUrl:'./header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(iconRegistry:MatIconRegistry, sanitizer:DomSanitizer ,@Inject(DOCUMENT) document){
    iconRegistry.addSvgIcon('MAS',sanitizer.bypassSecurityTrustResourceUrl('../assets/logo.svg'));
  }

  ngOnInit() {
  }

  ngOnDestroy(){

  }
  clicked = false;
  menuItem(){

    var x = document.getElementById("menuId");
    if (x.classList.contains("menu") && !this.clicked) {
      x.classList.add("responsive");
      this.clicked=true;
    } else {
      x.classList.remove("responsive");
      this.clicked=false;
    }
  }
  @HostListener('window:scroll', ['$event'])
    onWindowScroll(e) {
    let element = document.querySelector('.menu');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }

}
