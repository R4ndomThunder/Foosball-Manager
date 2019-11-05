import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Tournament } from '../services/tournaments';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-tournament-manager',
  templateUrl: './tournament-manager.component.html',
  styleUrls: ['./tournament-manager.component.scss']
})
export class TournamentManagerComponent implements OnInit {

  id : string;
  tournament:Tournament;

  constructor(public crud: CrudService, public auth: AuthService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
      });

    this.crud.getTournamentDetail(this.id).subscribe(data => {
      if (data.payload.exists) {
        let f = {
          id: data.payload.id,
          name: data.payload.data()["name"],
          teams: data.payload.data()["teams"],
          matches: data.payload.data()["matches"],
          users: data.payload.data()["users"],
          type: data.payload.data()["type"],
          admin: data.payload.data()["admin"]
        };
        this.tournament = f;
      }
      else {
        this.router.navigate(['/404']);
      }
    });
  }


  closeTournament()
  {
    //Remove tournament
    this.crud.removeTournament(this.tournament);
  }

}
