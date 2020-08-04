import { OnDestroy, OnInit, Component } from '@angular/core';



@Component({
  selector:'app-resultat',
  templateUrl:'./resultat.component.html',
  styleUrls:['./resultat.component.css']
})
export class ResulatComponent implements OnInit,OnDestroy {

  elements: any = [
    {equipeRecevante: {name:'MAS',logo:'../../../assets/logo.png'}, equipeVisiteuse	: {name:'ASS',logo:'../../../assets/ASS-Logo.jpg'} , resultat: '3-0'},
    {equipeRecevante: {name:'MAS',logo:'../../../assets/logo.png'}, equipeVisiteuse	: {name:'ASS',logo:'../../../assets/ASS-Logo.jpg'} , resultat: '3-0'},
    {equipeRecevante: {name:'MAS',logo:'../../../assets/logo.png'}, equipeVisiteuse	: {name:'ASS',logo:'../../../assets/ASS-Logo.jpg'} , resultat: '3-0'}
  ];

  headElementsWithTwoTd = ['Equipe recevante	','', 'Equipe visiteuse'];

  ngOnInit(){

  }

  ngOnDestroy(){

  }
}
