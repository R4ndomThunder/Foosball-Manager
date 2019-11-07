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
  randomize: boolean;
  tournamentControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private crudService: CrudService, public auth: AuthService, private router: Router, private _snackBar: SnackbarService) {
    this.tournamentForm = fb.group({
      Name: ['', Validators.required],
      Type: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  setValue(i, e) {
    if (e.checked) {
      this.randomize = true;
    }
    else {
      this.randomize = false;
    }
  }

  createTournament() {
    var t = new Tournament(t, true, this.name, this.auth.userData.uid, this.type, this.randomize);

    var role = this.auth.extraData != undefined ? this.auth.extraData.preferredRole : "Any";
    var u = new TournamentUser(u, true, this.auth.userData.uid, this.auth.userData.displayName, role);

    t.users.push(u);
    this.crudService.addInfoToTournament(t).then(resp => {
      this._snackBar.show('🏆 Tournament created successfully.');
    }).catch(error => {
      this._snackBar.show('⚠️ Error: ' + error);
    });
    this.router.navigate(['dashboard']);
  }
}
