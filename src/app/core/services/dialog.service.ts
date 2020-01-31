import { AlertSuccessComponent } from '../components/alert/alert-success/alert-success.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertErrorComponent } from '../components/alert/alert-error/alert-error.component';
import { AlertWarnComponent } from '../components/alert/alert-warn/alert-warn.component';
import { AlertInfoComponent } from '../components/alert/alert-info/alert-info.component';
import { AlertConfirmComponent } from '../components/alert/alert-confirm/alert-confirm.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private modalService: MatDialog) {}

  public successMessage(message: string, height?: string, width?: string) {
    this.modalService.open(AlertSuccessComponent, {
      height: height || AlertSuccessComponent.height,
      width: width || AlertSuccessComponent.width,
      autoFocus: false,
      data: { text: message },
    });
  }

  public errorMessage(message: string, height?: string, width?: string) {
    this.modalService.open(AlertErrorComponent, {
      height: height || AlertErrorComponent.height,
      width: width || AlertErrorComponent.width,
      autoFocus: false,
      data: { text: message },
    });
  }

  public warnMessage(message: string, height?: string, width?: string) {
    this.modalService.open(AlertWarnComponent, {
      height: height || AlertWarnComponent.height,
      width: width || AlertWarnComponent.width,
      autoFocus: false,
      data: { text: message },
    });
  }

  public infoMessage(message: string, height?: string, width?: string) {
    this.modalService.open(AlertInfoComponent, {
      height: height || AlertInfoComponent.height,
      width: width || AlertInfoComponent.width,
      autoFocus: false,
      data: { text: message },
    });
  }

  public confirm(
    tittle: string,
    contet: string,
    cancelTxtButton: string,
    confirmTxtButton,
    confirmFunction: any,
    height?: string,
    width?: string
  ) {
    this.modalService.open(AlertConfirmComponent, {
      height: height || AlertConfirmComponent.height,
      width: width || AlertConfirmComponent.width,
      autoFocus: false,
      data: {
        title: tittle,
        content: contet,
        cancelTextButton: cancelTxtButton,
        confirmTextButton: confirmTxtButton,
        confirm: confirmFunction,
      },
    });
  }
}
