import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnData } from './column-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
  @Input() datasource: any[] = [];
  @Input() columns: ColumnData[] = [];
  @Input() actionsOnRowTemplate?: TemplateRef<any>;
  @Input() filterTemplate?: TemplateRef<any>;

  protected _displayedColumns: string[] = [];
  protected _datasource: MatTableDataSource<any> = new MatTableDataSource();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datasource']?.currentValue) {
      this._datasource = new MatTableDataSource(changes['datasource'].currentValue);
    }
    if (changes['columns']?.currentValue) {
      this._displayedColumns = changes['columns'].currentValue.map((it: ColumnData) => it.name);
    }
  }

  protected applyPipe(row: any, item: ColumnData): string {
    return item.pipe?.transform(row[item.name]) || row[item.name];
  }

  showActions(player: any): void {
    player.hovered = true;
  }

  hideActions(player: any): void {
    player.hovered = null;
  }
}

