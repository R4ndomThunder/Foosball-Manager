import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../services/matches';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'matchlist',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {

  @Input()
  matches : Match[];
  @Input()
  tournamentId : string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  PlayMatch(){
    this.router.navigate(['/matchmaker'], { queryParams: { id: this.tournamentId, add: "true" } });
  }
}
