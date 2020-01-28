import { Component, Optional, Inject } from '@angular/core';
import { Alert } from '../Alert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertSuccessComponent } from '../alert-success/alert-success.component';

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss']
})
export class AlertConfirmComponent extends Alert {

  public static width = '350px';
  public static height = '270px';

  constructor(public dialogRef: MatDialogRef<AlertSuccessComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  close(): void {
    this.dialogRef.close();
  }
}