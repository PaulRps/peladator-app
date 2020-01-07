import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMenuItemComponent } from './team-menu-item.component';

describe('TeamMenuItemComponent', () => {
  let component: TeamMenuItemComponent;
  let fixture: ComponentFixture<TeamMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
