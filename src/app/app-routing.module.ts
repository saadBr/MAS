import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './public/Accueil/accueil.component';
import { MotDePresidentComponent } from './public/Club/motDePresident/motDePresident.component';
import { ComiteComponent } from './public/Club/comite/comite.component';
import { PalmaresComponent } from './public/Club/palmares/palmares.component';
import { listOfActualiteComponent } from './public/Actualites/listOfActualite.component';
import { PresentationComponent } from './public/Equipe Pro/Presentation/presentation.component';
import { ResulatComponent } from './public/Equipe Pro/resultats/resultat.component';
import { ProgrammeComponent } from './public/Equipe Pro/programme/programme.component';
import { ClassementComponent } from './public/Equipe Pro/classement/classement.component';
import { EffectifComponent } from './public/Equipe Pro/effectif/effectif.component';
import { StaffComponent } from './public/Equipe Pro/staff/staff.component';
import { listOfAcademieComponent } from './public/Academie/listOfAcademie.component';
import { PhotosComponent } from './public/Media/Photos/photos.component';
import { AcademieByIdComponent } from './public/Academie/academieById.component';
import { ActualiteByIdComponent } from './public/Actualites/actualiteById.component';
import { PlayerCreateComponent } from './Admin/players/player-create/player-create.component';
import { AuthenticationGuard } from './Admin/authentification/authentification.guard';
import { PlayersList } from './Admin/players/players-list/players-list.component';
import { StaffCreateComponent } from './Admin/staff/staff-create/staff-create.component';
import { StaffsList } from './Admin/staff/staff-list/staff-list.component';
import { ComiteCreateComponent } from './Admin/comite/comite-create/comite-create.component';
import { ComitesList } from './Admin/comite/comite-list/comite-list.component';
import { CoupeCreateComponent } from './Admin/coupe/coupe-create/coupe-create.component';
import { CoupesList } from './Admin/coupe/coupe-list/coupe-list.component';
import { ActualiteCreateComponent } from './Admin/actualites/actualite-create/actualite-create.component';
import { ActualitesList } from './Admin/actualites/actualite-list/actualite-list.component';
import { AcademiesList } from './Admin/academie/academie-list/academie-list.component';
import { AcademieCreateComponent } from './Admin/academie/academie-create/academie-create.component';
import { SponsorsList } from './Admin/sponsor/sponsor-list/sponsor-list.component';
import { SponsorCreateComponent } from './Admin/sponsor/sponsor-create/sponsor-create.component';
import { SliderCreateComponent } from './Admin/slider/slider-create/slider-create.component';
import { SlidersList } from './Admin/slider/slider-list/slider-list.component';
import { PhotoCreateComponent } from './Admin/photo/photos-create/photo-create.component';
import { PhotosList } from './Admin/photo/photos-list/photo-list.component';
import { ArticleCreateComponent } from './Admin/article/article-create/article-create.component';
import { ArticlesList } from './Admin/article/articles-list/article-list.component';
import { PalmaresCreateComponent } from './Admin/palmares/palmares-create/palmares-create.component';
import { MotDePresidentCreateComponent } from './Admin/motDePresident/motDePresident-create/motDePresident-create.component';
import { PresentationCreateComponent } from './Admin/presentation/presentation-create/presentation-create.component';
import { ArticleComponent } from './public/MAS STORE/article.component';


const routes: Routes = [
  {path:'',component:AccueilComponent},
  {path:'club/mot de president',component:MotDePresidentComponent},
  {path:'club/comite',component:ComiteComponent},
  {path:'club/palmares',component:PalmaresComponent},
  {path:'actualites',component:listOfActualiteComponent},
  {path:'actualite/:actualiteId',component:ActualiteByIdComponent},
  {path:'equipe pro/presentation',component:PresentationComponent},
  {path:'equipe pro/resultats',component:ResulatComponent},
  {path:'equipe pro/programme',component:ProgrammeComponent},
  {path:'equipe pro/classement',component:ClassementComponent},
  {path:'equipe pro/effectif',component:EffectifComponent},
  {path:'equipe pro/staff technique',component:StaffComponent},
  {path:'academie',component:listOfAcademieComponent},
  {path:'academie/:academieId',component:AcademieByIdComponent},
  {path:'media/photos',component:PhotosComponent},
  {path:'academie/:idAcademie',component:AcademieByIdComponent},
  {path:'mas store',component:ArticleComponent},
  {path:'admin/auth',loadChildren:()=>import('src/app/Admin/authentification/authentification.module').then(m=>m.AuthentificationModule)},
  {path:'admin/effectif/ajouter',component:PlayerCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/effectif/modifier/:playerId',component:PlayerCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/effectif/liste effectifs',component:PlayersList,canActivate:[AuthenticationGuard]},
  {path:'admin/staff/ajouter',component:StaffCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/staff/modifier/:staffId',component:StaffCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/staff/liste staff',component:StaffsList,canActivate:[AuthenticationGuard]},
  {path:'admin/comite/ajouter',component:ComiteCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/comite/modifier/:comiteId',component:ComiteCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/comite/liste comite',component:ComitesList,canActivate:[AuthenticationGuard]},
  {path:'admin/coupe/ajouter',component:CoupeCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/coupe/modifier/:coupeId',component:CoupeCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/coupe/liste coupe',component:CoupesList,canActivate:[AuthenticationGuard]},
  {path:'admin/actualite/ajouter',component:ActualiteCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/actualite/modifier/:actualiteId',component:ActualiteCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/actualite/liste actualite',component:ActualitesList,canActivate:[AuthenticationGuard]},
  {path:'admin/academie/ajouter',component:AcademieCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/academie/modifier/:academieId',component:AcademieCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/academie/liste academie',component:AcademiesList,canActivate:[AuthenticationGuard]},
  {path:'admin/sponsor/ajouter',component:SponsorCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/sponsor/modifier/:sponsorId',component:SponsorCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/sponsor/liste sponsor',component:SponsorsList,canActivate:[AuthenticationGuard]},
  {path:'admin/article/ajouter',component:ArticleCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/article/modifier/:articleId',component:ArticleCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/article/liste article',component:ArticlesList,canActivate:[AuthenticationGuard]},
  {path:'admin/slider/ajouter',component:SliderCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/slider/modifier/:sliderId',component:SliderCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/slider/liste slider',component:SlidersList,canActivate:[AuthenticationGuard]},
  {path:'admin/photo/ajouter',component:PhotoCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/photo/modifier/:photoId',component:PhotoCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/photo/liste photo',component:PhotosList,canActivate:[AuthenticationGuard]},
  {path:'admin/palmares/modifier/:palmaresId',component:PalmaresCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/motDePresident/modifier/:motDePresidentId',component:MotDePresidentCreateComponent,canActivate:[AuthenticationGuard]},
  {path:'admin/presentation/modifier/:presentationId',component:PresentationCreateComponent,canActivate:[AuthenticationGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
