import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmanagerComponent } from './matchmanager.component';

describe('MatchmanagerComponent', () => {
  let component: MatchmanagerComponent;
  let fixture: ComponentFixture<MatchmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
