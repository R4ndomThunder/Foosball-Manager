import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Tournament } from '../services/tournaments';
import { TournamentUser } from '../services/user';

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

  constructor(private fb: FormBuilder, private crudService: CrudService,public auth: AuthService, private router: Router, private _snackBar: MatSnackBar) {
    this.tournamentForm = fb.group({
      Name: ['', Validators.required],
      Type: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  createTournament() {
    var t = new Tournament(t, true, this.name, this.auth.userData.uid, this.type);

    var u = new TournamentUser(u, true, this.auth.userData.uid, this.auth.userData.displayName, "Any");   

    t.users.push(u);
    this.crudService.addInfoToTournament(t).then(resp => {
      this._snackBar.open('🏆 Tournament created successfully.', '❌', { duration: 5000, });
    }).catch(error => {
      this._snackBar.open('⚠️ Error: ' + error, '❌', { duration: 5000, });
    });
    this.router.navigate(['dashboard']);
  }
}
