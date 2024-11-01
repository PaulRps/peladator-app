import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFixtureComponent } from './create-fixture.component';

describe('CreateFixtureComponent', () => {
  let component: CreateFixtureComponent;
  let fixture: ComponentFixture<CreateFixtureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFixtureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
