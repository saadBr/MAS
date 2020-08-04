import { Player } from './player.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL=environment.apiUrl+"players";
@Injectable({providedIn: 'root'})
export class PlayerService {
  private players: Player[]= [];
  private playerUpdated = new Subject<{players:Player[],playerCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}

  getPlayers(playersPerSize:number,currentPage:number) {
    const queryParams= `?pagesize=${playersPerSize}&page=${currentPage}`;
    this.http.get<{message:string;players:any;maxPlayers:number}>
    (BACKEND_URL+queryParams)
    .pipe(
      map((playerData)=>{
        return {
          players:playerData.players.map(player=>{
            return {
              nom: player.nom,
              poste: player.poste,
              id: player._id,
              imagePath:player.imagePath,
              creator:player.creator
          };
        }),
        maxPlayers:playerData.maxPlayers
       };
       })
    )
    .subscribe((transformedData)=>{
      this.players=transformedData.players;
      this.playerUpdated.next({
        players:[...this.players],
        playerCount:transformedData.maxPlayers});
    });
  }

  getPlayerUpdateListener() {
    return this.playerUpdated.asObservable();
  }

  getPlayer(id:string) {
    return this.http.get<{_id:string;nom:string;poste:string,imagePath:string,creator:string}>(BACKEND_URL+"/"+id);
  }
  addPlayer(nom:string,poste:string,image:File) {
    const playerData =  new FormData();
    playerData.append("nom",nom);
    playerData.append("poste",poste);
    playerData.append("image",image, nom);
    this.http.post<{message:string, player: Player}>(BACKEND_URL,playerData).subscribe((responseData)=>{
      this.router.navigate(["/admin/effectif/liste effectifs"]);
    });
  }

  updatePlayer(id:string, nom:string,poste:string, image:File | string){
    let playerData:Player | FormData;
    if(typeof(image) === 'object'){
      playerData = new FormData();
      playerData.append("id",id);
      playerData.append("nom",nom);
      playerData.append("poste",poste);
      playerData.append("image",image, nom);
    } else{
      playerData = {
        id:id,
        nom:nom,
        poste:poste,
        imagePath:image,
        creator:null
      }
    }
    this.http
    .put(BACKEND_URL+"/"+id,playerData)
    .subscribe(response=>{
      this.router.navigate(["/admin/effectif/liste effectifs/"]);
    });
  }

  deletePlayer(playerId: string) {
    return this.http
    .delete(BACKEND_URL+"/" + playerId);
  }
}
