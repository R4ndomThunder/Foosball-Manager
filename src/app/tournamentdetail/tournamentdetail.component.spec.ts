import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentdetailComponent } from './tournamentdetail.component';

describe('TournamentdetailComponent', () => {
  let component: TournamentdetailComponent;
  let fixture: ComponentFixture<TournamentdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
