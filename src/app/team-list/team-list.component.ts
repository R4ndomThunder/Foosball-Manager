import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../services/team';

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


  constructor() { }

  ngOnInit() {
    var noplayed = this.teams.filter(t => t.played == 0);
    this.teams = this.teams.filter(t => t.played > 0).sort(function (a, b) { return b.score - a.score || (b.goalFatti - b.goalSubiti) - (a.goalFatti - a.goalSubiti); });
    this.teams.push(...noplayed);
  }

}
