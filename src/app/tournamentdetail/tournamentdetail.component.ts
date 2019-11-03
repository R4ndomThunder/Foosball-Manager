import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Team } from '../services/team';
import { AuthService } from '../auth-service.service';
import { Tournament } from '../services/tournaments';

@Component({
  selector: 'app-tournamentdetail',
  templateUrl: './tournamentdetail.component.html',
  styleUrls: ['./tournamentdetail.component.scss']
})
export class TournamentdetailComponent implements OnInit {

  id: string;
  tournament: Tournament;
  teams: any;

  constructor(public auth : AuthService, private crud: CrudService, private route: ActivatedRoute, private router: Router) { }

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
          users:  data.payload.data()["users"]
        };
        this.tournament = f;
      }
      else {
        this.router.navigate(['/404']);
      }
    });
  }

  createNewTeam(tournamentId)
  {
    this.router.navigate(['/teammaker'], { queryParams: { id:  tournamentId} });
  }

  get isSigned(): boolean
  {
    var r = this.tournament.users.indexOf(this.auth.userData.id) != -1;
    console.log("asd:" + r);
    return r;
  }
}