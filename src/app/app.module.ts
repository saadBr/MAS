import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'
import {MatMenuModule} from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './public/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './public/footer/footer.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PalmaresComponent } from './public/Club/palmares/palmares.component';
import { MotDePresidentComponent } from './public/Club/motDePresident/motDePresident.component';
import { ComiteComponent } from './public/Club/comite/comite.component';
import { listOfActualiteComponent } from './public/Actualites/listOfActualite.component';
import { ActualiteByIdComponent } from './public/Actualites/actualiteById.component';
import { PresentationComponent } from './public/Equipe Pro/Presentation/presentation.component';
import { ProgrammeComponent } from './public/Equipe Pro/programme/programme.component';
import { ResulatComponent } from './public/Equipe Pro/resultats/resultat.component';
import { ClassementComponent } from './public/Equipe Pro/classement/classement.component';
import { EffectifComponent } from './public/Equipe Pro/effectif/effectif.component';
import { StaffComponent } from './public/Equipe Pro/staff/staff.component';
import { listOfAcademieComponent } from './public/Academie/listOfAcademie.component';
import { AcademieByIdComponent } from './public/Academie/academieById.component';
import { PhotosComponent } from './public/Media/Photos/photos.component';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule, LIGHTBOX_CONFIG } from '@ngx-gallery/lightbox';
import { AccueilComponent } from './public/Accueil/accueil.component';
import { MenuComponent } from './Admin/menu/menu.component';
import { PlayerCreateComponent } from './Admin/players/player-create/player-create.component';
import { PlayersList } from './Admin/players/players-list/players-list.component';
import { PlayerModule } from './Admin/players/player.module';
import { AuthentificationInteceptor } from './Admin/authentification/authentification.interceptor';
import { AuthenticationGuard } from './Admin/authentification/authentification.guard';
import { MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { StaffModule } from './Admin/staff/staff.module';
import { ComiteModule } from './Admin/comite/comite.module';
import { ActualiteModule } from './Admin/actualites/actualite.module';
import { AcademieModule } from './Admin/academie/academie.module';
import { CoupeModule } from './Admin/coupe/coupe.module';
import { SponsorModule } from './Admin/sponsor/sponsor.module';
import { SliderModule } from './Admin/slider/slider.module';
import { PhotoModule } from './Admin/photo/photos.module';
import { ArticleModule } from './Admin/article/article.module';
import { PalmaresModule } from './Admin/palmares/palmares.module';
import { MotDePresidentModule } from './Admin/motDePresident/motDePresident.module';
import { PresentationModule } from './Admin/presentation/presentation.module';
import { ErrorInteceptor } from 'src/error.interceptor';
import { ErrorComponent } from './Admin/error-handling/error.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PhotoService } from './Admin/photo/photos.service';
import { ArticleComponent } from './public/MAS STORE/article.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PalmaresComponent,
    MotDePresidentComponent,
    ComiteComponent,
    listOfActualiteComponent,
    ActualiteByIdComponent,
    PresentationComponent,
    ProgrammeComponent,
    ResulatComponent,
    ClassementComponent,
    EffectifComponent,
    StaffComponent,
    listOfAcademieComponent,
    AcademieByIdComponent,
    AccueilComponent,
    PhotosComponent,
    MenuComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    MatCardModule,
    MatPaginatorModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    GalleryModule,
    LightboxModule,
    PlayerModule,
    MatSidenavModule,
    StaffModule,
    ComiteModule,
    ActualiteModule,
    AcademieModule,
    CoupeModule,
    SponsorModule,
    SliderModule,
    PhotoModule,
    ArticleModule,
    PalmaresModule,
    MotDePresidentModule,
    PresentationModule

  ],
  providers: [MatIconRegistry,AuthenticationGuard,
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false
      }
    },
    PhotoService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthentificationInteceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInteceptor,multi:true}],
    bootstrap: [AppComponent],
    entryComponents:[ErrorComponent]
})
export class AppModule { }
