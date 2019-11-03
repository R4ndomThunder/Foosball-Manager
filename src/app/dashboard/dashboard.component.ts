import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { AuthService } from '../auth-service.service';
import { User } from '../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tournaments: any;
  logged: boolean;
  user: User;
  constructor(public auth: AuthService, private crud: CrudService, public router: Router) { }

  
  ngOnInit() {

    this.crud.getTournaments().subscribe(data => {
      this.tournaments = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          teams: e.payload.doc.data()['teams'],
        }
      })
    });
  }

  goToTournament(tId) {
    this.router.navigate(['/tournament'], { queryParams: { id:  tId} });
  }

}
