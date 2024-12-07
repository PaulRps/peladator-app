import { Component, EventEmitter, Input, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnData } from '../table/column-data';

@Component({
  selector: 'app-table-with-filter-add-button',
  templateUrl: './table-with-filter-add-button.component.html',
  styleUrl: './table-with-filter-add-button.component.scss',
})
export class TableWithFilterAddButtonComponent {
  @Input() datasource: any[] = [];
  @Input() columns: ColumnData[] = [];
  @Input() actionsOnRow?: TemplateRef<any>;
  @Input() filterPlaceholder: string = 'digite';
  @Input() addButton?: {
    color: string;
    text: string;
    routerLink: string;
  };
  @Output() onRowClick = new EventEmitter<any>();

  constructor(private readonly router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datasource']?.currentValue) {
      this.datasource = changes['datasource'].currentValue;
    }
    if (changes['columns']?.currentValue) {
      this.columns = changes['columns'].currentValue;
    }
    if (changes['addButton']?.currentValue) {
      this.addButton = changes['addButton'].currentValue;
    }
    if (changes['filterPlaceholder']?.currentValue) {
      this.filterPlaceholder = changes['filterPlaceholder'].currentValue;
    }
  }

  protected applyFilter(event: Event, data: any): void {
    const filterValue = (event.target as HTMLInputElement).value;
    data.filter = filterValue;
  }

  protected addButtonClick(): void {
    this.router.navigate([this.addButton?.routerLink]);
  }
}

