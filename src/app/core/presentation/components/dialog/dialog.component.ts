import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  data = inject(MAT_DIALOG_DATA);
  confirm(): void {
    this.data?.onConfirm?.call();
  }
  cancel(): void {
    this.data?.onCancel?.call();
  }
}

