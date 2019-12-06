import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../services/team';
import { PopupService } from '../snackbar.service';

@Component({
  selector: 'teamlist',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  @Input()
  teams: Team[];
  @Input()
  tournamentId: string;

  limit :number = 8 ;

  constructor(private popup : PopupService) { }

  ngOnInit() {
    var noplayed = this.teams.filter(t => t.played == 0);
    this.teams = this.teams.filter(t => t.played > 0).sort(function (a, b) { return b.score - a.score || (b.goalFatti - b.goalSubiti) - (a.goalFatti - a.goalSubiti); });
    this.teams.push(...noplayed);
  }

  showTeamDetail(teamId : string)
  {
    var team = this.teams.find(t => t.id == teamId);
    this.popup.showModal("#myModal");
  }

}
