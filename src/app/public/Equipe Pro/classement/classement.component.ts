import { OnDestroy, OnInit, Component } from '@angular/core';
import {MatSortModule} from '@angular/material/sort';
import { element } from 'protractor';



@Component({
  selector:'app-classement',
  templateUrl:'./classement.component.html',
  styleUrls:['./classement.component.css']
})
export class ClassementComponent implements OnInit,OnDestroy {

  elements: any = [
    {Equipe: {name:'MAS',logo:'../../../assets/logo.png'},  Points: '39', Difference: '12'},
    {Equipe: {name:'SCCM',logo:'../../../assets/Adversaire_logo/sccm.jpg'},  Points: '39', Difference: '9'},
    {Equipe: {name:'RAC',logo:'../../../assets/Adversaire_logo/rac.png'},  Points: '35', Difference: '10'},
  ];


  headElementsWithTwoTd = ['Equipe'];
  headElementsWithSingleTd = [ 'Points', 'Difference'];

  ngOnInit(){
    this.elements.sort(
      function(a, b) {
         if (a.Points === b.Points) {
            return b.Difference - a.Difference;
         }
         return a.Points > b.Points ? -1 : 1;
      });
  }

  ngOnDestroy(){

  }
}
