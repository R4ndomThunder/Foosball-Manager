import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentManagerComponent } from './tournament-manager.component';

describe('TournamentManagerComponent', () => {
  let component: TournamentManagerComponent;
  let fixture: ComponentFixture<TournamentManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
