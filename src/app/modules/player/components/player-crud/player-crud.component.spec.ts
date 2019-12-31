import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCrudComponent } from './player-crud.component';

describe('PlayerCreateComponent', () => {
  let component: PlayerCrudComponent;
  let fixture: ComponentFixture<PlayerCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
