import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from '../player.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerService } from '../player.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthentificationServices } from 'src/app/Admin/authentification/authentification.service';

@Component({
  selector: 'app-player-create',
  templateUrl:'./player-create.component.html',
  styleUrls:['../../../app.component.css','../../admin.component.css']
})
export class PlayerCreateComponent implements OnInit,OnDestroy {
  entredTitle="";
  entredContent="";
  mode = 'create';
  private playerId: string;

  form: FormGroup;
  player:Player;
  imagePreview: string;
  private authStatusSub:Subscription;
  constructor(
    public playerService: PlayerService,
    public route: ActivatedRoute,
    public authService:AuthentificationServices) {}

  onenregistrerPlayer(){
    if (this.form.invalid){
      return;
    }

    if(this.mode === 'create')
    {
      console.log(this.form.value.nom);
      this.playerService.addPlayer(this.form.value.nom, this.form.value.poste,this.form.value.image);
    }
    else{
      this.playerService.updatePlayer(this.playerId,this.form.value.nom, this.form.value.poste,this.form.value.image);
    }
    this.form.reset();

  }

  ngOnInit() {
    this.authStatusSub=this.authService
    .getAuthStatusListnner()
    .subscribe(authStatus=>{

    });
    this.form = new FormGroup({
      nom: new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      poste: new FormControl(null,{validators:[Validators.required]}),
      image: new FormControl(null, {validators:[Validators.required],asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('playerId')){
        this.mode='edit';
        this.playerId=paramMap.get('playerId');

        this.playerService.getPlayer(this.playerId).subscribe(playerData=> {

          this.player = {
            id: playerData._id,
            nom: playerData.nom,
            poste:playerData.poste,
            imagePath:playerData.imagePath,
            creator:playerData.creator
          };
        this.form.setValue({
          nom:this.player.nom,
          poste:this.player.poste,
          image:this.player.imagePath
          });
        });
      }else {
        this.mode='create';
        this.playerId=null;
      }
    });
  }

  onImagePicked(evnt:Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
