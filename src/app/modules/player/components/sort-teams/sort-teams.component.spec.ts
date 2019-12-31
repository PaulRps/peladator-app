import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortTeamsComponent } from './sort-teams.component';


describe('TeamsComponent', () => {
  let component: SortTeamsComponent;
  let fixture: ComponentFixture<SortTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
