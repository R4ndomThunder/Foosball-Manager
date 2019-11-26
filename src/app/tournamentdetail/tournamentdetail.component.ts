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
import { formatDate } from '@angular/common';

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
          brackets: data.payload.data()["brackets"]
        };
        this.tournament = f;
        this.matches = this.tournament.matches;
        this.matches.forEach(element => {
          element.blueTeam = this.tournament.teams.find(t => t.id == element.blueTeamId);
          element.redTeam = this.tournament.teams.find(t => t.id == element.redTeamId);
        });

        if (this.tournament.brackets == null) {
          var rounds: Round[] = [];
          this.brackets = {
            rounds: rounds,
          }
        }
        else
          this.brackets = this.tournament.brackets;
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
    this.router.navigate(['/matchmaker'], { queryParams: { id: tournamentId, add: "false" } });
  }

  addNewMatch(tournamentId){
    this.router.navigate(['/matchmaker'], { queryParams: { id: tournamentId, add: "true" } });
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
    var emptyMatch: Match = {
      id: "",
      date: formatDate(new Date(), "dd MMM yyyy", 'en'),
      blueScore: 0,
      redScore: 0,
      blueTeamId: "",
      redTeamId: "",
      finished: true,
    }

    var matchesNumber = 0;
    if (this.tournament.teams.length % 2 == 0)
      matchesNumber = this.tournament.teams.length / 2;
    else {
      this._snackBar.show("Unable to make brackets");
      return;
    }
    var teams = Object.assign([], this.tournament.teams);
    var roundsNumber = this.SmallestDivisor(matchesNumber);
    for (let i = 0; i <= roundsNumber; i++) {
      var round: Round = {
        matches: []
      };
      if (i == 0) {
        for (let index = 0; index < matchesNumber; index++) {
          var t1 = this.random(teams.length);
          var t2 = this.random(teams.length, t1);

          var newMatch : Match = {
            blueTeamId: teams[t1].id,
            redTeamId: teams[t2].id,
            blueScore: 0,
            redScore : 0,
            finished: true,
            date: formatDate(new Date(), "dd MMM yyyy", 'en'),
            id: teams[t2].id+teams[t1].id+formatDate(new Date(), "ddMMyyyyHHmmss", 'en')
          };

          round.matches.push(newMatch);
          teams.splice(t1, 1);
          teams.splice(t2, 1);
          }
      }
      else {
        for (let index = 0; index < matchesNumber; index++) {
          round.matches.push(emptyMatch);
        }
      }
      this.brackets.rounds.push(round);
      matchesNumber /= 2;
    }

    this.tournament.brackets = this.brackets;
    this.crud.addInfoToTournament(this.tournament);
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
          var dIndex = this.random(defenders.length);
          var sIndex = this.random(strikers.length)

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
    var player = this.tournament.users.find(u => u.uid == id);
    if (player != null)
      return player.name;
    else
      return "N/A";
  }

  getTeamName(id) {
    var team = this.tournament.teams.find(t => t.id == id);
    if (team != null)
      return team.name;
    else
      return "N/A";
  }

  public SmallestDivisor(n: number) {
    for (let index = 1; index <= n; index++) {
      if (n % index == 0)
        return index;
    }
  }

  random(max: number, d?: number) {
    if (d != null) {
      var x = 0;
      do {
        x = Math.floor((Math.random() * max));
      }
      while (x == d);
      return x;
    }
    else
      return Math.floor((Math.random() * max));
  }
}