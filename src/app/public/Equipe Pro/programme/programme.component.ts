import { OnDestroy, OnInit, Component } from '@angular/core';



@Component({
  selector:'app-programme',
  templateUrl:'./programme.component.html',
  styleUrls:['./programme.component.css']
})
export class ProgrammeComponent implements OnInit,OnDestroy {

  elements: any = [
    {equipeRecevante: {name:'MAS',logo:'../../../assets/logo.png'}, equipeVisiteuse	: {name:'ASS',logo:'../../../assets/ASS-Logo.jpg'} , date_match: '14-03-2020	', heure_match: '16:00'},
    {equipeRecevante: {name:'MAS',logo:'../../../assets/logo.png'}, equipeVisiteuse	: {name:'MAS',logo:'../../../assets/logo.png'} , date_match: '14-03-2020	', heure_match: '16:00'},
    {equipeRecevante: {name:'MAS',logo:'../../../assets/logo.png'}, equipeVisiteuse	: {name:'MAS',logo:'../../../assets/logo.png'} , date_match: '14-03-2020	', heure_match: '16:00'},
  ];

  headElementsWithTwoTd = ['Equipe recevante	', 'Equipe visiteuse	'];
  headElementsWithSingleTd = [ 'Date', 'Heure'];

  ngOnInit(){

  }

  ngOnDestroy(){

  }
}
