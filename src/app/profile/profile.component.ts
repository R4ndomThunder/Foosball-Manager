import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { CrudService } from '../crud.service';
import { extraUserData } from '../services/extraUserData';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  logged: boolean;
  extraUserData: extraUserData;  //extra data from firestore
  userData: any; //Data from google

  role: string;
  userForm: FormGroup;
  userControl = new FormControl('', [Validators.required]);
  userId: string;
  constructor(public auth: AuthService, public crud: CrudService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder) {
    this.userForm = fb.group({
      Role: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.userId = params.id;
      });

    this.crud.getPlayerData(this.userId).subscribe(data => {
      if (data.payload.exists) {
        let uData: extraUserData = {
          gf: data.payload.data()["gf"],
          gs: data.payload.data()["gs"],
          win: data.payload.data()["win"],
          lost: data.payload.data()["lost"],
          played: data.payload.data()["played"],
          preferredRole: data.payload.data()["preferredRole"]
        }
        this.extraUserData = uData;
      }
      else
      {
        this.updateInfo();
      }
      this.role = this.extraUserData.preferredRole;
    })
  }

  updateInfo() {
    if (this.extraUserData == null) {
      let uData: extraUserData = {
        gf: 0,
        gs: 0,
        win: 0,
        lost: 0,
        played: 0,
        preferredRole: "Any"
      }
      this.extraUserData = uData;
    }
    this.extraUserData.preferredRole = this.role;
    this.crud.setPlayerData(this.userId, this.extraUserData);
  }
}
