import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';
import { Tournament } from '../services/tournaments';
import { TournamentUser } from '../services/user';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-tournamentmaker',
  templateUrl: './tournamentmaker.component.html',
  styleUrls: ['./tournamentmaker.component.scss']
})
export class TournamentmakerComponent implements OnInit {
  tournamentForm: FormGroup;
  name: string;
  tournament: any;
  type: string;

  tournamentControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private crudService: CrudService, public auth: AuthService, private router: Router, private _snackBar: SnackbarService) {
    this.tournamentForm = fb.group({
      Name: ['', Validators.required],
      Type: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  createTournament() {

    let t : Tournament = new Tournament(null, true, this.name, this.auth.userData.uid, this.type);

    var role = this.auth.extraData != undefined ? this.auth.extraData.preferredRole : "Any";

    var u = {
      name: this.auth.userData.displayName,
      uid: this.auth.userData.uid,
      role: role
    };
    t.users.push(u);
    this.crudService.addInfoToTournament(t).then(resp => {
      this._snackBar.show('🏆 Tournament created successfully.');
    }).catch(error => {
      this._snackBar.show('⚠️ Error: ' + error);
    });
    this.router.navigate(['dashboard']);
  }
}
