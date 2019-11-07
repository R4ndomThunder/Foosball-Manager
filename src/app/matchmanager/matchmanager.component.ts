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
          randomizeTeams: data.payload.data()["randomizeTeams"]
        };
        this.tournament = new Tournament(f);

        this.tournament.matches.forEach(element => {
          if (element.id == this.matchId)
            this.match = new Match(element);
        });

        this.team1 = this.tournament.teams.find(t => t.id == this.match.blueTeamId)


        this.dfsTeam1 = this.tournament.users.find(u => u.uid == this.team1.defenderId)
        this.strTeam1 = this.tournament.users.find(u => u.uid == this.team1.strikerId)

        this.team2 = this.tournament.teams.find(t => t.id == this.match.redTeamId)


        this.dfsTeam2 = this.tournament.users.find(u => u.uid == this.team2.defenderId)
        this.strTeam2 = this.tournament.users.find(u => u.uid == this.team2.strikerId)
      }
      else {
        this.router.navigate(['/404']);
      }
    });
  }

  addScore(player, team) {

  }

  stopMatch() {
    let snackRes = this.snack.showWithAction("⚠ Are you sure to stop this match?", "✔")
    snackRes.onAction().subscribe(() => {
      this.tournament.matches.forEach(element => {
        if (element.id == this.matchId) {
          element.finished = true;
        }
      });

      this.crud.addInfoToTournament(this.tournament);
      this.router.navigate(["/tournament"], { queryParams: { id: this.tournament.id } })
    });
  }

}
