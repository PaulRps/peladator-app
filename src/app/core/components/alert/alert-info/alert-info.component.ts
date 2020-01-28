import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Alert } from '../Alert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertSuccessComponent } from '../alert-success/alert-success.component';

@Component({
  selector: 'app-alert-info',
  templateUrl: './alert-info.component.html',
  styleUrls: ['./alert-info.component.scss']
})
export class AlertInfoComponent extends Alert {

  constructor(public dialogRef: MatDialogRef<AlertSuccessComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  close(): void {
    this.dialogRef.close();
  }
}
