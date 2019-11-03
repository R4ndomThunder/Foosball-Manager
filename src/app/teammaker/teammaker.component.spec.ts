import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammakerComponent } from './teammaker.component';

describe('TeammakerComponent', () => {
  let component: TeammakerComponent;
  let fixture: ComponentFixture<TeammakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeammakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeammakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
