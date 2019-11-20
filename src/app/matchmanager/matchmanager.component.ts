import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { CrudService } from '../crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Match } from '../services/matches';
import { Tournament } from '../services/tournaments';
import { Team } from '../services/team';
import { SnackbarService } from '../snackbar.service';
import { TournamentUser } from '../services/user';
import { extraUserData } from '../services/extraUserData';
import { Bracket } from '../services/brackets';

@Component({
  selector: 'app-matchmanager',
  templateUrl: './matchmanager.component.html',
  styleUrls: ['./matchmanager.component.scss']
})
export class MatchmanagerComponent implements OnInit {

  matchId: string;
  tournamentId: string;
  tournament: Tournament;
  match: Match;

  team1: Team;
  team2: Team;
  team1Score: number = 0;
  team2Score: number = 0;

  strTeam1: TournamentUser;
  strTeam2: TournamentUser;
  dfsTeam1: TournamentUser;
  dfsTeam2: TournamentUser;

  constructor(public auth: AuthService, private crud: CrudService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private snack: SnackbarService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.matchId = params.match;
        this.tournamentId = params.tournament;
      });

    this.crud.getTournamentDetail(this.tournamentId).subscribe(data => {
      if (data.payload.exists) {
        let f: Tournament = {
          id: data.payload.id,
          name: data.payload.data()["name"],
          teams: data.payload.data()["teams"],
          matches: data.payload.data()["matches"],
          users: data.payload.data()["users"],
          type: data.payload.data()["type"],
          admin: data.payload.data()["admin"],
          brackets : data.payload.data()["brackets"]
        };
        this.tournament = new Tournament(f);
        var brackets : Bracket = {
          rounds: []
        }

        this.tournament.brackets = this.tournament.brackets == null ?  brackets : this.tournament.brackets;
        this.tournament.matches.forEach(element => {
          if (element.id == this.matchId)
            this.match = new Match(element);
        });

        this.team1 = this.tournament.teams.find(t => t.id == this.match.blueTeamId)

        this.dfsTeam1 = this.tournament.users.find(u => u.uid == this.team1.defenderId)
        this.strTeam1 = this.tournament.users.find(u => u.uid == this.team1.strikerId)

        console.log(this.team1);

        this.team2 = this.tournament.teams.find(t => t.id == this.match.redTeamId)

        this.dfsTeam2 = this.tournament.users.find(u => u.uid == this.team2.defenderId)
        this.strTeam2 = this.tournament.users.find(u => u.uid == this.team2.strikerId)
        console.log(this.team2);
      }
      else {
        this.router.navigate(['/404']);
      }
    });
  }

  addGoal(player: TournamentUser, team: Team) {
    console.log("Add 1 point for: " + team);
    var t1 = this.tournament.teams.find(t => t.id == this.match.blueTeamId);
    var t2 = this.tournament.teams.find(t => t.id == this.match.redTeamId);

    if (team.id == t1.id) {
      team.goalFatti++;
      t2.goalSubiti++;
      this.tournament.matches.find(m => m.id == this.match.id).blueScore++;
      this.crud.addInfoToTournament(this.tournament);
    }
    else if (team.id == t2.id) {
      team.goalFatti++;
      t1.goalSubiti++;
      this.tournament.matches.find(m => m.id == this.match.id).redScore++;
      this.crud.addInfoToTournament(this.tournament);
    }
    // player.++;
    this.crud.addInfoToTournament(this.tournament);
  }

  removeGoal(player: TournamentUser, team: Team) {
    var t1 = this.tournament.teams.find(t => t.id == this.match.blueTeamId);
    var t2 = this.tournament.teams.find(t => t.id == this.match.redTeamId);

    if (team.id == t1.id && this.match.blueScore > 0) {
      team.goalFatti--;
      t2.goalSubiti--;
      this.tournament.matches.find(m => m.id == this.match.id).blueScore--;
      this.crud.addInfoToTournament(this.tournament);
    }
    else if (team.id == t2.id) {
      team.goalFatti++;
      t1.goalSubiti++;
      this.tournament.matches.find(m => m.id == this.match.id).redScore++;
      this.crud.addInfoToTournament(this.tournament);
    }

    // player.gf--;
    this.crud.setPlayerData(this.auth.userData.uid, player);
  }

  stopMatch() {
    let snackRes = this.snack.showWithAction("⚠ Are you sure to stop this match?", "✔")
    snackRes.onAction().subscribe(() => {
      this.tournament.matches.forEach(element => {
        if (element.id == this.matchId) {
          element.finished = true;
          var t1 = this.tournament.teams.find(t => t.id == this.match.blueTeamId);
          var t2 = this.tournament.teams.find(t => t.id == this.match.redTeamId);
          t1.played++;
          t2.played++;
          if (this.match.blueScore > this.match.redScore) {
            t1.win++;
            t1.score += 3;
            t2.lost++;
          }
          else if (this.match.blueScore < this.match.redScore) {
            t2.win++;
            t2.score += 3;
            t1.lost++;
          }
          else{
            t1.score++;
            t2.score++;
          }
        }
      });

      this.crud.addInfoToTournament(this.tournament);
      this.router.navigate(["/tournament"], { queryParams: { id: this.tournament.id } })
    });
  }

}
