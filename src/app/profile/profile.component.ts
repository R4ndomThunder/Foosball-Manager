import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { CrudService } from '../crud.service';
import { TournamentUser } from '../services/user';
import { extraUserData } from '../services/extraUserData';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  logged: boolean;
  extraUserData: extraUserData;  //extra data from firestore
  userData: any; //Data from google

  constructor(public auth: AuthService) { }

  ngOnInit() {
   
  }

  updateInfo()
  {
  }
}
