import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammanagerComponent } from './teammanager.component';

describe('TeammanagerComponent', () => {
  let component: TeammanagerComponent;
  let fixture: ComponentFixture<TeammanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeammanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeammanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
