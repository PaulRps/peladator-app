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
  MatCheckboxModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatGridListModule,
  MatSidenavModule,
  MatDividerModule
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
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatGridListModule,
    MatSidenavModule,
    MatDividerModule
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
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatGridListModule,
    MatSidenavModule,
    MatDividerModule
  ]
})

export class MaterialModule {}
