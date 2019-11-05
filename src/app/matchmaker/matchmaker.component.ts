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

@Component({
  selector: 'app-matchmaker',
  templateUrl: './matchmaker.component.html',
  styleUrls: ['./matchmaker.component.scss']
})
export class MatchmakerComponent implements OnInit {
  id: string;
  tournament: Tournament;
  match: Match;

  team1 : Team;
  team2: Team;

  matchForm: FormGroup;
  matchControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, public auth: AuthService, private crud: CrudService, private route: ActivatedRoute, private router: Router, private crudService: CrudService, private _snackBar: MatSnackBar) {
    this.matchForm = fb.group({
      blueTeam: ['', Validators.required],
      redTeam: ['', Validators.required],
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
          admin: data.payload.data()["admin"]
        };
        this.tournament = f;
      }
      else {
        this.router.navigate(['/404']);
      }
    });
  }

  getTeams() {

  }

  createMatch() {

    if (this.team1.name != this.team2.name) {

      let match: Match = {
        date: formatDate(new Date(), "dd MMM yyyy", 'en'),
        blueScore: 0,
        redScore: 0,
        redTeam: this.team1,
        blueTeam: this.team2,
        finished: false,
        id: this.team1.name + this.team2.name + formatDate(new Date(), "ddMMyyyyHHmmss", 'en'),
      }

      this.tournament.matches.push(match);
      this.crudService.addInfoToTournament(this.tournament).then(resp => {
        this._snackBar.open('🏆 Team created successfully.', '❌', { duration: 5000, verticalPosition: 'top' });
      }).catch(error => {
        this._snackBar.open('⚠️ Error: ' + error, '❌', { duration: 5000, });
      });
      this.router.navigate(['/matchmanager'], { queryParams: { id: match.id} });
    }
    else{
      alert("You cannot make a match with the same team for all side");
    }
  }
}
