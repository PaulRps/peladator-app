import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from './material.module';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [MenuComponent, DialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MenuComponent, MaterialModule],
})
export class ComponentsModule {}


