// material.module.ts

import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule, MatOptionModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    MatTableModule, 
    MatSelectModule,     
    MatOptionModule,
    MatFormFieldModule, 
    MatInputModule 
  ],
  exports: [
    MatTableModule,     
    MatSelectModule,     
    MatOptionModule,
    MatFormFieldModule, 
    MatInputModule
  ]
})

export class MaterialModule {}