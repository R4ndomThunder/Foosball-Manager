import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard.ts.guard';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TeammakerComponent } from './teammaker/teammaker.component';
import { TournamentmakerComponent } from './tournamentmaker/tournamentmaker.component';
import { TournamentdetailComponent } from './tournamentdetail/tournamentdetail.component';
import { MatchmakerComponent } from './matchmaker/matchmaker.component';
import { MatchmanagerComponent } from './matchmanager/matchmanager.component';
import { TournamentManagerComponent } from './tournament-manager/tournament-manager.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'profile', component: ProfileComponent,canActivate: [SecureInnerPagesGuard] },
  { path: 'teammaker', component: TeammakerComponent,canActivate: [SecureInnerPagesGuard] },
  { path: 'tournamentmaker', component: TournamentmakerComponent,canActivate: [SecureInnerPagesGuard] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate:[SecureInnerPagesGuard]},
  { path: 'tournament', component: TournamentdetailComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'matchmaker', component: MatchmakerComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'matchmanager', component: MatchmanagerComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'tournament-manager', component: TournamentManagerComponent, canActivate: [SecureInnerPagesGuard]},
  { path: '404', component: HomeComponent},
  { path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
