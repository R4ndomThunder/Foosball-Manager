import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { AuthService } from '../auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SnackbarService } from '../snackbar.service';
import { Tournament } from '../services/tournaments';
import { Team } from '../services/team';

@Component({
  selector: 'app-teammanager',
  templateUrl: './teammanager.component.html',
  styleUrls: ['./teammanager.component.scss']
})
export class TeammanagerComponent implements OnInit {

  tournamentId: string;
  tournament: Tournament;

  teamId: string;
  team: Team;
  teamName: string;
  teamForm: FormGroup;

  constructor(public crud: CrudService, public auth: AuthService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private _snackBar: SnackbarService) {
    this.teamForm = fb.group({
      Name: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.tournamentId = params.tournament;
        this.teamId = params.team;
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
          brackets: data.payload.data()["brackets"],
        };
        this.tournament = f;

        this.team = this.tournament.teams.find(t => t.id == this.teamId);
        this.teamId = this.team.id;
        this.teamName = this.team.name;
      }
      else {
        this.router.navigate(['/404']);
      }
    });
  }

  updateTeam() {
    let updatedTeam = this.tournament.teams.find(t => t.id == this.teamId);
    var i = this.tournament.teams.indexOf(updatedTeam);
    this.tournament.teams[i].name = this.teamName;

    this.crud.addInfoToTournament(this.tournament).then(resp => {
      this._snackBar.show('⚽ Team update successfully.');
    }).catch(error => {
      this._snackBar.show('⚠️ Error: ' + error);
    });
    this.router.navigate(['tournament'], { queryParams: { id: this.tournament.id } });

  }

}
