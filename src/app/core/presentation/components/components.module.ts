import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { TableWithFilterAddButtonComponent } from './table-with-filter-add-button/table-with-filter-add-button.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [MenuComponent, DialogComponent, TableComponent, TableWithFilterAddButtonComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MenuComponent, MaterialModule, TableComponent, TableWithFilterAddButtonComponent],
})
export class ComponentsModule {}

