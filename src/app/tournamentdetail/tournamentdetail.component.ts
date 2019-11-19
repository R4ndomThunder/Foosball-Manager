import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Team } from '../services/team';
import { AuthService } from '../auth-service.service';
import { Tournament } from '../services/tournaments';
import { TournamentUser } from '../services/user';
import { FormBuilder, Validators, Form, FormGroup } from '@angular/forms';
import { Match } from '../services/matches';
import { SnackbarService } from '../snackbar.service';
import { Bracket, Round } from '../services/brackets';

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
  matches: any;

  brackets: Bracket;

  dataSource = this.tournament;
  expandedElement: Tournament | null;
  columnsToDisplay = ["Name", "Score", "Win", "Lost", "Played", "GF", "GS"]

  constructor(public auth: AuthService, private crud: CrudService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder, public _snackBar: SnackbarService) {
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
        let f = {
          id: data.payload.id,
          name: data.payload.data()["name"],
          teams: data.payload.data()["teams"],
          matches: data.payload.data()["matches"],
          users: data.payload.data()["users"],
          type: data.payload.data()["type"],
          admin: data.payload.data()["admin"],
          randomizeTeams: data.payload.data()["randomizeTeams"]
        };
        this.tournament = f;
        this.matches = this.tournament.matches;
        this.matches.forEach(element => {
          element.blueTeam = this.tournament.teams.find(t => t.id == element.blueTeamId);
          element.redTeam = this.tournament.teams.find(t => t.id == element.redTeamId);
        });

        var rounds: Round[];
        this.brackets = {
          rounds: rounds,
        }
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
      this._snackBar.show('👤 Subscribed successfully.');
    }).catch(error => {
      this._snackBar.show('⚠️ Error: ' + error);
    });
    this.router.navigate(['/tournament'], { queryParams: { id: this.id } });
  }

  Unsubscibe() {
    let index: number = this.tournament.users.findIndex(user => user.uid == this.auth.userData.uid);

    this.tournament.users.splice(index, 1);

    this.crud.addInfoToTournament(this.tournament).then(resp => {
      this._snackBar.show('👤 Unsubscribed successfully.');
    }).catch(error => {
      this._snackBar.show('⚠️ Error: ' + error);
    });
    this.router.navigate(['/tournament'], { queryParams: { id: this.id } });
  }

  get isSigned(): boolean {
    let signed: boolean = false;
    if (this.tournament != null) {
      this.tournament.users.forEach(element => {
        if (element.uid == this.auth.userData.uid)
          signed = true;
      });
    }
    return signed;
  }

  get isAdmin(): boolean {
    if (this.tournament != null && this.tournament.admin == this.auth.userData.uid)
      return true;
    else
      return false;
  }

  inThisTeam(t: Team): boolean {
    return (t.strikerId == this.auth.userData.uid || t.defenderId == this.auth.userData.uid)

  }

  teamRandomized() {
    return this.tournament.randomizeTeams
  }

  editTeam(team) {
    this.router.navigate(['/teammanager'], { queryParams: { tournament: this.tournament.id, team: team.id } })
  }

  showMatch(matchid) {
    this.router.navigate(['/matchmanager'], { queryParams: { tournament: this.tournament.id, match: matchid } })
  }

  manageTournament() {
    this.router.navigate(['/tournament-manager'], { queryParams: { id: this.tournament.id } })
  }

  createBrackets() {
    //TODO
    var match: Match = {
      id: "",
      date: Date.now().toString(),
      blueScore: 0,
      redScore: 0,
      blueTeamId: "Team1",
      redTeamId: "Team2",
      finished: false,
    }
    
    var matches = [];
    for (let index = 0; index < 8; index++) {
      matches.push(match);
    }
    console.log(matches);

    var rounds = [];
    var round: Round = {
      matches: [match, match, match, match]
    };
    for (let index = 0; index < 2; index++) {
      rounds.push(round);
    }
    console.log(rounds);

    this.brackets.rounds = rounds;
    console.log(this.brackets);
  }

  createTeams() {
    var defenders = this.tournament.users.filter(u => u.role == "Defender");
    var strikers = this.tournament.users.filter(u => u.role == "Striker");
    var anys = this.tournament.users.filter(u => u.role == "Any");

    if (defenders.length > 0 && strikers.length > 0) {
      if (defenders.length != strikers.length) {
        if (anys.length > 0) {
          if (defenders.length > strikers.length) {
            for (let i = 0; i < defenders.length - strikers.length; i++) {
              if (anys.length > 0) {
                anys[0].role = "Striker";
                strikers.push(anys[0]);
                anys.splice(0, 1);
              }
            }
          }
          else if (defenders.length < strikers.length) {
            for (let i = 0; i < strikers.length - defenders.length; i++) {
              if (anys.length > 0) {
                anys[0].role = "Defender";
                defenders.push(anys[0]);
                anys.splice(0, 1);
              }
            }
          }
        }
        else
          this._snackBar.show("If defenders and strikers number is not the same you need some 'Any' players to fill missing positions");
      }
      if (defenders.length == strikers.length) {
        console.log("Generating...");
        var count = 0;
        this.tournament.teams = [];
        do {
          count++;
          var dIndex = Math.floor((Math.random() * defenders.length));
          var sIndex = Math.floor((Math.random() * strikers.length))

          var defenderId = defenders[dIndex].uid;
          var strikerId = strikers[sIndex].uid;

          var team: Team = {
            defenderId: defenderId,
            strikerId: strikerId,
            goalFatti: 0,
            goalSubiti: 0,
            lost: 0,
            played: 0,
            name: "Team" + count,
            score: 0,
            win: 0,
            id: "Team" + count
          };

          defenders.splice(dIndex, 1);
          strikers.splice(sIndex, 1);

          this.tournament.teams.push(team);
          console.log(team);
        }
        while (defenders.length > 0);
        console.log(this.tournament);
        this.crud.addInfoToTournament(this.tournament);
      }
    }
  }

  getUserName(id) {
    return this.tournament.users.find(u => u.uid == id).name;
  }

  getTeamName(id) {
    console.log(id);
    return this.tournament.teams.find(t => t.id == id).name;
  }
}