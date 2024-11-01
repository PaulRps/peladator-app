import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestCreatedFixtureComponent } from './latest-created-fixture.component';

describe('LatestCreatedFixtureComponent', () => {
  let component: LatestCreatedFixtureComponent;
  let fixture: ComponentFixture<LatestCreatedFixtureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LatestCreatedFixtureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestCreatedFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
