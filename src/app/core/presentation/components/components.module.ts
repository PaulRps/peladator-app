import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { DialogComponent } from './dialog/dialog.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from './material/material.module';
import { TableWithFilterComponent } from './table-with-filter/table-with-filter.component';
import { TableWithFilterAddButtonComponent } from './table-with-filter-add-button/table-with-filter-add-button.component';

@NgModule({
  declarations: [
    MenuComponent,
    DialogComponent,
    TableComponent,
    TableWithFilterComponent,
    TableWithFilterAddButtonComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [MenuComponent, MaterialModule, TableComponent, TableWithFilterComponent, TableWithFilterAddButtonComponent],
})
export class ComponentsModule {}






