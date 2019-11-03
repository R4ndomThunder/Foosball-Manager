import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

}
