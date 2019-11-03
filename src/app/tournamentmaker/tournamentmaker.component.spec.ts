import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentmakerComponent } from './tournamentmaker.component';

describe('TournamentmakerComponent', () => {
  let component: TournamentmakerComponent;
  let fixture: ComponentFixture<TournamentmakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentmakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
