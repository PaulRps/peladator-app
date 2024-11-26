import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithFilterAddButtonComponent } from './table-with-filter-add-button.component';

describe('TableWithFilterAddButtonComponent', () => {
  let component: TableWithFilterAddButtonComponent;
  let fixture: ComponentFixture<TableWithFilterAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableWithFilterAddButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableWithFilterAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
