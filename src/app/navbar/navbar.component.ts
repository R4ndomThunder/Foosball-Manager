import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  version: any;
  constructor(public auth: AuthService, public router: Router, public crud: CrudService) { }

  ngOnInit() {
    this.crud.getAppData().subscribe(data => {
      data.map(e => {
        this.version = e.payload.doc.data()["version"];
      })
    })
  }

  GoToProfile() {
    this.router.navigate(['/profile'], { queryParams: { id: this.auth.userData.uid } });
  }

}
