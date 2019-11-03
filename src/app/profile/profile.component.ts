import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  logged: boolean;
  user: any;
  userData: any;

  constructor(public auth: AuthService, public crud: CrudService) { }

  ngOnInit() {
    
  }
}
