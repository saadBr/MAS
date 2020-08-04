import { Component, OnInit, OnDestroy } from "@angular/core";
import { Player } from '../player.model';
import { PlayerService } from '../player.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';
@Component({
  selector:'app-players-list',
  templateUrl:'./players-list.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})

export class PlayersList implements OnInit,OnDestroy {
  players:Player[] =  [];
  private playersSub: Subscription;
  private authSub: Subscription;
  userId:string;
  userIsAuthenticated = true;

  pageSizeOptions=[10,20,50];
  playerPerPage = 10;
  currentPage=1;
  totalPlayers=0;
  constructor(public playerService: PlayerService,public authentificationService:AuthentificationServices) {}

  ngOnInit() {

    this.playerService.getPlayers(this.playerPerPage,this.currentPage);
    this.userId=this.authentificationService.getUserId();
    this.playersSub=this.playerService.getPlayerUpdateListener().subscribe((playerData:{players:Player[],playerCount:number})=>{

      this.players=playerData.players;
      this.totalPlayers=playerData.playerCount;
    });
    this.userIsAuthenticated=this.authentificationService.getIsAuth();
    this.authSub = this.authentificationService.getAuthStatusListnner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.authentificationService.getUserId();
    });
  }

  onChangedPage(pageData:PageEvent) {

    this.currentPage=pageData.pageIndex+1;
    this.playerPerPage=pageData.pageSize;
    this.playerService.getPlayers(this.playerPerPage,this.currentPage);
  }

  onDelete(playerId: string) {

    this.playerService.deletePlayer(playerId).subscribe(()=>{
      this.playerService.getPlayers(this.playerPerPage,this.currentPage);
    }),()=>{

    };
  }

  ngOnDestroy() {
    this.playersSub.unsubscribe();
    this.authSub.unsubscribe();
  }


}
