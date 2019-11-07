import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CrudService } from '../crud.service';
import { Tournament } from '../services/tournaments';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-tournament-manager',
  templateUrl: './tournament-manager.component.html',
  styleUrls: ['./tournament-manager.component.scss']
})
export class TournamentManagerComponent implements OnInit {

  tournamentForm: FormGroup;
  id: string;
  name: string;
  type: string;
  randomize: boolean;
  tournament: Tournament;
  tournamentControl = new FormControl('', [Validators.required]);

  constructor(public crud: CrudService, public auth: AuthService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private _snackBar: SnackbarService) {
    this.tournamentForm = fb.group({
      Name: ['', Validators.required],
      Type: ['', Validators.required],
    })
  }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
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
          admin: data.payload.data()["admin"],
          randomizeTeams: data.payload.data()["randomizeTeams"]
        };
        this.tournament = f;
        this.name = this.tournament.name;
        this.type = this.tournament.type;
        this.randomize = this.tournament.randomizeTeams;
      }
      else {
        this.router.navigate(['/404']);
      }
    });
  }

  setValue(e) {
    if (e.checked) {
      this.randomize = true;
    }
    else {
      this.randomize = false;
    }
  }


  closeTournament() {
    //Remove tournament
    let snack = this._snackBar.showWithAction("⚠ Are you sure to close this tournament?","Yes!");
    snack.onAction().subscribe(() =>{
      this.crud.removeTournament(this.tournament);
    });
  }

  updateTournament() {
    this.tournament.name = this.name;
    this.tournament.type = this.type;
    this.tournament.randomizeTeams = this.randomize;

    this.crud.addInfoToTournament(this.tournament).then(resp => {

      this._snackBar.show('🏆 Tournament update successfully.');
    }).catch(error => {
      this._snackBar.show('⚠️ Error: ' + error);
    });
    this.router.navigate(['tournament'], {queryParams: {id: this.tournament.id}});
  }

}
