// material.module.ts

import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule, MatOptionModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatTableModule, 
    MatSelectModule,     
    MatOptionModule,
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule 
  ],
  exports: [
    MatTableModule,     
    MatSelectModule,     
    MatOptionModule,
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule
  ]
})

export class MaterialModule {}