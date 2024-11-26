import { PipeTransform } from '@angular/core';

export interface ColumnData {
  label: string;
  name: string;
  pipe?: PipeTransform;
}
