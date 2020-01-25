import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsSortedComponent } from './teams-sorted.component';

describe('TeamSortComponent', () => {
  let component: TeamsSortedComponent;
  let fixture: ComponentFixture<TeamsSortedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsSortedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsSortedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
