import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Tournament } from '../services/tournaments';
import { Team } from '../services/team';

@Component({
  selector: 'app-teammaker',
  templateUrl: './teammaker.component.html',
  styleUrls: ['./teammaker.component.scss']
})
export class TeammakerComponent implements OnInit {
  constructor(private fb: FormBuilder,private crud: CrudService, private route: ActivatedRoute, private router: Router, private crudService: CrudService,private _snackBar: MatSnackBar) { 
    this.teamForm = fb.group({
      Name: ['', Validators.required],
    })
  }

  id:string;
  tournament :Tournament;
  name : string;
  teamForm: FormGroup;
  teamControl = new FormControl('', [Validators.required]);

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


  createTeam() {
    console.log(JSON.stringify(this.tournament));
    let newTeam : Team = {
      name: this.name,
      defender: "",
      striker: "",
      goalFatti: 0,
      goalSubiti: 0,
      lost: 0,
      score: 0,
      win: 0
    }
    console.log(JSON.stringify(newTeam));

    this.tournament.teams = this.tournament.teams || [];

    this.tournament.teams.push(newTeam);
    console.log(JSON.stringify(this.tournament));
    this.crudService.addNewTeam(this.tournament).then(resp => {
      this._snackBar.open('🏆 Team created successfully.', '❌', { duration: 5000, verticalPosition: 'top'});
    }).catch(error => {
      this._snackBar.open('⚠️ Error: ' + error, '❌', { duration: 5000, });
    });
    this.router.navigate(['/tournament'], { queryParams: { id:  this.id} });
  }

}
