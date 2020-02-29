import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsMenuItemComponent } from './teams-menu-item.component';

describe('TeamMenuItemComponent', () => {
  let component: TeamsMenuItemComponent;
  let fixture: ComponentFixture<TeamsMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsMenuItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
