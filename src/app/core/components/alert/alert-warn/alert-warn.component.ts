import { Component, Optional, Inject } from '@angular/core';
import { Alert } from '../Alert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-warn',
  templateUrl: './alert-warn.component.html',
  styleUrls: ['./alert-warn.component.scss']
})
export class AlertWarnComponent extends Alert {

  constructor(public dialogRef: MatDialogRef<AlertWarnComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  close(): void {
    this.dialogRef.close();
  }

}
