import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Tournament } from '../services/tournaments';
import { User } from '../services/user';

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
    var t : Tournament= {
      name: this.name,
      id: this.name,
      matches: [],
      teams: [],
      users: [],
      type: this.type,
      admin: this.auth.userData.uid
    }

    let u: User = {
      name : this.auth.userData.displayName,
      uid: this.auth.userData.uid,
      role: "any"
    }

    t.users.push(u);
    this.crudService.createNewTournament(t).then(resp => {
      this._snackBar.open('🏆 Tournament created successfully.', '❌', { duration: 5000, });
    }).catch(error => {
      this._snackBar.open('⚠️ Error: ' + error, '❌', { duration: 5000, });
    });
    this.router.navigate(['dashboard']);
  }
}
