import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Team } from '../services/team';
import { AuthService } from '../auth-service.service';
import { Tournament } from '../services/tournaments';
import { TournamentUser } from '../services/user';
import { FormBuilder, Validators, Form, FormGroup } from '@angular/forms';
import { Match } from '../services/matches';

@Component({
  selector: 'app-tournamentdetail',
  templateUrl: './tournamentdetail.component.html',
  styleUrls: ['./tournamentdetail.component.scss']
})
export class TournamentdetailComponent implements OnInit {

  id: string;
  tournament: Tournament;
  teams: any;
  playerRole: string;
  roleForm: FormGroup;
  match: Match;

  constructor(public auth: AuthService, private crud: CrudService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder) {
    this.roleForm = this.fb.group({
      PlayerRole: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
      });

    this.crud.getTournamentDetail(this.id).subscribe(data => {
      if (data.payload.exists) {
        let f : Tournament = {
          id: data.payload.id,
          name: data.payload.data()["name"],
          teams: data.payload.data()["teams"],
          matches: data.payload.data()["matches"],
          users: data.payload.data()["users"],
          type: data.payload.data()["type"],
          admin: data.payload.data()["admin"]
        };
        this.tournament = f;
      }
      else {
        this.router.navigate(['/404']);
      }
    });
  }

  createNewTeam(tournamentId) {
    this.router.navigate(['/teammaker'], { queryParams: { id: tournamentId } });
  }

  createNewMatch(tournamentId) {
    this.router.navigate(['/matchmaker'], { queryParams: { id: tournamentId } });
  }

  subscribe() {
    let newUser: TournamentUser = {
      uid: this.auth.userData.uid,
      name: this.auth.userData.displayName,
      role: this.playerRole
    }
    this.tournament.users.push(newUser);
    this.crud.addInfoToTournament(this.tournament).then(resp => {
      // this._snackBar.open('🏆 Team created successfully.', '❌', { duration: 5000, verticalPosition: 'top'});
    }).catch(error => {
      // this._snackBar.open('⚠️ Error: ' + error, '❌', { duration: 5000, });
    });
    this.router.navigate(['/tournament'], { queryParams: { id: this.id } });
  }

  Unsubscibe() {
    let index: number = this.tournament.users.findIndex(user => user.uid == this.auth.userData.uid);

    this.tournament.users.splice(index, 1);

    this.crud.addInfoToTournament(this.tournament).then(resp => {
      // this._snackBar.open('🏆 Team created successfully.', '❌', { duration: 5000, verticalPosition: 'top'});
    }).catch(error => {
      // this._snackBar.open('⚠️ Error: ' + error, '❌', { duration: 5000, });
    });
    this.router.navigate(['/tournament'], { queryParams: { id: this.id } });
  }

  get isSigned(): boolean {
    let signed: boolean = false;
    this.tournament.users.forEach(element => {
      if (element.uid == this.auth.userData.uid)
        signed = true;
    });
    return signed;
  }

  get isAdmin(): boolean {
    if (this.tournament.admin == this.auth.userData.uid)
      return true;
    else
      return false;
  }

  showMatch(matchid) {
    this.router.navigate(['/matchmanager'], { queryParams: { tournament: this.tournament.id, match: matchid } })
  }

  manageTournament()
  {
    this.router.navigate(['/tournament-manager'],{ queryParams: { id: this.tournament.id } })
  }

  createBrackets()
  {
    
  }
}