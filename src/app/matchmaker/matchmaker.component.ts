import { Component, OnInit } from '@angular/core';
import { Match } from '../services/matches';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Tournament } from '../services/tournaments';

@Component({
  selector: 'app-matchmaker',
  templateUrl: './matchmaker.component.html',
  styleUrls: ['./matchmaker.component.scss']
})
export class MatchmakerComponent implements OnInit {
  id: string;
  tournament: Tournament;
  match: Match;

  matchForm: FormGroup;
  matchControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder,private crud: CrudService, private route: ActivatedRoute, private router: Router, private crudService: CrudService,private _snackBar: MatSnackBar) {
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
          users: data.payload.data()["users"]
        };
        this.tournament = f;
      }
      else {
        this.router.navigate(['/404']);
      }
    });
  }

  createMatch()
  {
    let match: Match = {
      date: new Date(),
      blueScore: 0,
      redScore : 0,
      redTeam: "",
      blueTeam: ""
    }

    this.tournament.matches.push(match);
    console.log(JSON.stringify(this.tournament));
    this.crudService.addNewTeam(this.tournament).then(resp => {
      this._snackBar.open('🏆 Team created successfully.', '❌', { duration: 5000, verticalPosition: 'top'});
    }).catch(error => {
      this._snackBar.open('⚠️ Error: ' + error, '❌', { duration: 5000, });
    });
    this.router.navigate(['/tournament'], { queryParams: { id:  this.id} });
  }
}
