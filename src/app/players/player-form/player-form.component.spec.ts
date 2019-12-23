import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlayerFormComponent } from './player-form.component';

describe('PlayersAddComponent', () => {
  let component: ModalPlayerFormComponent;
  let fixture: ComponentFixture<ModalPlayerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPlayerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlayerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
