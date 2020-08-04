import { OnDestroy, OnInit, Component } from '@angular/core';
import { PlayerService } from 'src/app/Admin/players/player.service';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/Admin/players/player.model';



@Component({
  selector:'app-effectif',
  templateUrl:'./effectif.component.html',
  styleUrls:['./effectif.component.css']
})
export class EffectifComponent implements OnInit,OnDestroy {
  players:Player[] =  [];
  gardien:Player[] = [];
  diffenseur:Player[] = [];
  milieu:Player[]=[];
  attaquant:Player[]=[];
  private playersSub: Subscription;
  playerPerPage = 50;
  currentPage=1;
  totalPlayers=0;
  isLoading=true;
  constructor(public playerService: PlayerService){}
  ngOnInit(){
    this.playerService.getPlayers(this.playerPerPage,this.currentPage);
    this.playersSub=this.playerService.getPlayerUpdateListener().subscribe((playerData:{players:Player[],playerCount:number})=>{
      this.players=playerData.players;
      this.totalPlayers=playerData.playerCount;
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        if(player.poste=='Gardien')
        {
          this.gardien.push(player);
        }
        else if(player.poste=='Diffenseur')
        {
          this.diffenseur.push(player);
        }
        else if(player.poste=='Milieu')
        {
          this.milieu.push(player);
        }
        else if(player.poste=='Attaquant')
        {
          this.attaquant.push(player);
        }
        this.isLoading=false;
      }
    });
  }

  ngOnDestroy(){
    this.playersSub.unsubscribe();
  }
}
