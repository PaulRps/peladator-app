import { Component, Optional, Inject } from '@angular/core';
import { Alert } from '../Alert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertSuccessComponent } from '../alert-success/alert-success.component';

@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.scss']
})
export class AlertErrorComponent extends Alert {

  constructor(public dialogRef: MatDialogRef<AlertSuccessComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  close(): void {
    this.dialogRef.close();
  }
}
