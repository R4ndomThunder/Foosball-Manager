import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';


import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './auth-service.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSnackBarModule } from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TeammakerComponent } from './teammaker/teammaker.component';
import { TournamentmakerComponent } from './tournamentmaker/tournamentmaker.component';
import { TournamentdetailComponent } from './tournamentdetail/tournamentdetail.component';
import { MatchmakerComponent } from './matchmaker/matchmaker.component';
import { MatchmanagerComponent } from './matchmanager/matchmanager.component';
import { TournamentManagerComponent } from './tournament-manager/tournament-manager.component';
import { TeammanagerComponent } from './teammanager/teammanager.component';
import { MessagingService } from './messaging.service';
import { AngularFireMessagingModule, AngularFireMessaging } from '@angular/fire/messaging';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MatchListComponent } from './match-list/match-list.component';
import { TeamListComponent } from './team-list/team-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ModalComponent } from './modal/modal.component';
import { PopupService } from './snackbar.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LeaderboardComponent,
    TeammakerComponent,
    TournamentmakerComponent,
    TournamentdetailComponent,
    MatchmakerComponent,
    MatchmanagerComponent,
    TournamentManagerComponent,
    TeammanagerComponent,
    LoadingComponent,
    MatchListComponent,
    TeamListComponent,
    CalendarComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('/firebase-messaging-sw.js', { enabled: environment.production }),
    NoopAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule, 
    MatSlideToggleModule,
    MatExpansionModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AuthService, MessagingService, PopupService, ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
