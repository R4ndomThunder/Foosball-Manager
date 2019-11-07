import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { CrudService } from '../crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Match } from '../services/matches';
import { Tournament } from '../services/tournaments';
import { Team } from '../services/team';

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

  constructor(public auth: AuthService, private crud: CrudService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.matchId = params.match;
        this.tournamentId = params.tournament;
      });

    this.crud.getTournamentDetail(this.tournamentId).subscribe(data => {
      if (data.payload.exists) {
        let f : Tournament = {
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
          if(element.id == this.matchId)
            this.match = new Match(element);
        });
      }
      else {
        this.router.navigate(['/404']);
      }
    });
  }

  addScore(player, team)
  {

  }

  stopMatch()
  {
    this.tournament.matches.forEach(element => {
      if(element.id == this.matchId)
        element.finished = true;
    });

    this.crud.addInfoToTournament(this.tournament);
    this.router.navigate(["/tournament"],{ queryParams: { id: this.tournament.id}})
  }

}
