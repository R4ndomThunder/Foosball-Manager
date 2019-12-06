import { Component, OnInit } from '@angular/core';
import { Match } from '../services/matches';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Tournament } from '../services/tournaments';
import { Team } from '../services/team';
import { formatDate } from '@angular/common';
import { AuthService } from '../auth-service.service';
import { PopupService } from '../snackbar.service';

@Component({
  selector: 'app-matchmaker',
  templateUrl: './matchmaker.component.html',
  styleUrls: ['./matchmaker.component.scss']
})
export class MatchmakerComponent implements OnInit {
  id: string;
  add: string;

  tournament: Tournament;
  match: Match;

  team1: Team;
  team2: Team;

  blueScore: number;
  redScore: number;

  matchForm: FormGroup;
  matchControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, public auth: AuthService, private crud: CrudService, private route: ActivatedRoute, private router: Router, private crudService: CrudService, private _snackBar: PopupService) {
    this.matchForm = fb.group({
      blueTeam: ['', Validators.required],
      redTeam: ['', Validators.required],
      redS: [0, Validators.required],
      blueS: [0, Validators.required],
    })
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        this.add = params.add;
      });

    this.crud.getTournamentDetail(this.id).subscribe(data => {
      if (data.payload.exists) {
        let f: Tournament = {
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
    this.redScore = 0;
    this.blueScore = 0;
  }

  createMatch() {
    if (this.team1.id != this.team2.id) {
      if (this.add == 'true') {
        if (this.redScore <= -1 && this.blueScore <= -1) {
          this._snackBar.show("⚠ You cannot select negative score for the match");
        }
        else if (this.redScore == this.blueScore) {
          this._snackBar.show("⚠ You cannot make a match with the same team for all side");
        }
        else {
          let match: Match = {
            date: formatDate(new Date(), "dd MMM yyyy", 'en'),
            blueScore: this.blueScore,
            redScore: this.redScore,
            redTeamId: this.team1.id,
            blueTeamId: this.team2.id,
            finished: this.add == 'true',
            id: this.team1.id + this.team2.id + formatDate(new Date(), "ddMMyyyyHHmmss", 'en'),
          }

          this.team1.played++;
          this.team2.played++;

          this.team1.goalFatti += this.redScore;
          this.team1.goalSubiti += this.blueScore;

          this.team2.goalFatti += this.blueScore;
          this.team2.goalSubiti += this.redScore;
          
          if (this.redScore > this.blueScore) {
            this.team1.win++;
            this.team2.lost++;
            this.team1.score += 3;
          }
          else {
            this.team2.win++;
            this.team1.lost++;
            this.team2.score += 3;
          }

          var team2 = this.tournament.teams.find(t => t.id == this.team2.id);
          team2 = this.team2;
          var team1 = this.tournament.teams.find(t => t.id == this.team1.id);
          team1 = this.team1;
          this.tournament.matches.push(match);
          this.crudService.addInfoToTournament(this.tournament).then(resp => {
            this._snackBar.show('⚽ Match added successfully.');
          }).catch(error => {
            this._snackBar.show('⚠️ Error: ' + error);
          });
          this.router.navigate(['/tournament'], { queryParams: { id: this.tournament.id } })
        }
      }
      else {
        let match: Match = {
          date: formatDate(new Date(), "dd MMM yyyy", 'en'),
          blueScore: this.blueScore,
          redScore: this.redScore,
          redTeamId: this.team1.id,
          blueTeamId: this.team2.id,
          finished: this.add == 'true',
          id: this.team1.id + this.team2.id + formatDate(new Date(), "ddMMyyyyHHmmss", 'en'),
        }
        this.tournament.matches.push(match);

        this.crudService.addInfoToTournament(this.tournament).then(resp => {
          this._snackBar.show('⚽ Match created successfully.');
        }).catch(error => {
          this._snackBar.show('⚠️ Error: ' + error);
        });
        this.router.navigate(['/matchmanager'], { queryParams: { tournament: this.tournament.id, match: match.id } });
      }
    }
  }
}