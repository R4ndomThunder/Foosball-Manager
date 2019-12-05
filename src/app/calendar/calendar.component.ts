import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../services/matches';
import { Router } from '@angular/router';

@Component({
  selector: 'match-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private router : Router) { }
  @Input()
  calendar : Match[];
  @Input()
  tournamentId : string;
  
  ngOnInit() {
  }

  PlayMatch(){
    this.router.navigate(['/matchmaker'], { queryParams: { id: this.tournamentId, add: "false" } });
  }
}
