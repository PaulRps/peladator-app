import { Alert } from './../Alert';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-info',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.scss']
})
export class AlertSuccessComponent extends Alert {

  constructor(public dialogRef: MatDialogRef<AlertSuccessComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  close = (): void => {
    this.dialogRef.close();
  }

}
