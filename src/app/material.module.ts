// material.module.ts

import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { 
  MatSelectModule, 
  MatOptionModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatPaginatorModule, 
  MatListModule,
  MatButtonModule, 
  MatIconModule,
  MatMenuModule,
  MatToolbarModule 
} from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatTableModule, 
    MatSelectModule,     
    MatOptionModule,
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatListModule,
    MatButtonModule, 
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ],
  exports: [
    MatTableModule,     
    MatSelectModule,     
    MatOptionModule,
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatListModule,
    MatButtonModule, 
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ]
})

export class MaterialModule {}