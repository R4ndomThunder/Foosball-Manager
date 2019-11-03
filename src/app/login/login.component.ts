import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  items: Observable<any[]>;
  loginForm: FormGroup;

  constructor(public auth: AuthService) {
   
  }

  ngOnInit() {
  }

 
}
