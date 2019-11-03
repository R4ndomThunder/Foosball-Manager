import { Component, OnInit } from '@angular/core';
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'foosballmanager';
  user: any;
  constructor(private router: Router, public auth: AuthService, library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIconPacks(far);
    library.addIconPacks(fab);
  }

  ngOnInit() {
  }


}
