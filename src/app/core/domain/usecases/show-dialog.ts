import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../presentation/components/dialog/dialog.component';
import { Usecase } from './usecase';

export interface DialogData {
  title: string;
  content: string;
  confirmTextButton: string;
  cancelTextButton?: string;

  onConfirm(): void;
  onCancel?: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ShowDialog implements Usecase<DialogData, void> {
  private readonly dialog = inject(MatDialog);

  execute(data: DialogData): void {
    this.dialog.open(DialogComponent, {
      data,
    });
  }
}


