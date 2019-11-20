import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Tournament } from '../services/tournaments';
import { Team } from '../services/team';
import { TournamentUser } from '../services/user';
import { AuthService } from '../auth-service.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-teammaker',
  templateUrl: './teammaker.component.html',
  styleUrls: ['./teammaker.component.scss']
})
export class TeammakerComponent implements OnInit {
  constructor(private fb: FormBuilder, public auth: AuthService,private crud: CrudService, private route: ActivatedRoute, private router: Router, private crudService: CrudService,private _snackBar: SnackbarService) { 
    this.teamForm = fb.group({
      Name: ['', Validators.required],
      Striker: [, Validators.required],
      Defender: [, Validators.required]
    })
  }

  id:string;
  tournament :Tournament;
  name : string;
  striker : TournamentUser;
  defender : TournamentUser;
  teamForm: FormGroup;

  teamControl = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.id = params.id;
    });

    this.crud.getTournamentDetail(this.id).subscribe(data => {
      if (data.payload.exists) {
        let f : Tournament= {
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

  getStrikers()
  {
    let strikers = [];
    this.tournament.users.forEach(element => {
      if(element.role === "Striker")
      {
        strikers.push (element);
      }
    });

    return strikers;
  }

  getDefenders()
  {
    let defenders = [];
    this.tournament.users.forEach(element => {
      if(element.role === "Defender")
      {
        defenders.push (element);
      }
    });

    return defenders;
  }

  createTeam() {
    let newTeam : Team = {
      name: this.name,
      defenderId: this.defender.uid,
      strikerId: this.striker.uid,
      goalFatti: 0,
      goalSubiti: 0,
      lost: 0,
      score: 0,
      win: 0,
      played: 0,
      id:  this.name.replace(/\s/g, "")
    }

    this.tournament.teams = this.tournament.teams || [];

    this.tournament.teams.push(newTeam);
    this.crudService.addInfoToTournament(this.tournament).then(resp => {
      this._snackBar.show('⚽ Team created successfully.');
    }).catch(error => {
      this._snackBar.show('⚠️ Error: ' + error);
    });
    this.router.navigate(['/tournament'], { queryParams: { id:  this.id} });
  }

}
