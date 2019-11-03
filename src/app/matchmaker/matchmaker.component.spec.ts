import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakerComponent } from './matchmaker.component';

describe('MatchmakerComponent', () => {
  let component: MatchmakerComponent;
  let fixture: ComponentFixture<MatchmakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
