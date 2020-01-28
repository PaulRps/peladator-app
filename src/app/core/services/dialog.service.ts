import { AlertSuccessComponent } from '../components/alert/alert-success/alert-success.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertErrorComponent } from '../components/alert/alert-error/alert-error.component';
import { AlertWarnComponent } from '../components/alert/alert-warn/alert-warn.component';
import { AlertInfoComponent } from '../components/alert/alert-info/alert-info.component';
import { AlertConfirmComponent } from '../components/alert/alert-confirm/alert-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modalService: MatDialog) { }

  public successMessage(message: string) {
    this.modalService.open(AlertSuccessComponent, {
      height: AlertSuccessComponent.height,
      width: AlertSuccessComponent.width,
      autoFocus: false,
      data: {text: message}
    });
  }

  public errorMessage(message: string) {
    this.modalService.open(AlertErrorComponent, {
      height: AlertErrorComponent.height,
      width: AlertErrorComponent.width,
      autoFocus: false,
      data: {text: message}
    });
  }

  public warnMessage(message: string) {
    this.modalService.open(AlertWarnComponent, {
      height: AlertWarnComponent.height,
      width: AlertWarnComponent.width,
      autoFocus: false,
      data: {text: message}
    });
  }

  public infoMessage(message: string) {
    this.modalService.open(AlertInfoComponent, {
      height: AlertInfoComponent.height,
      width: AlertInfoComponent.width,
      autoFocus: false,
      data: {text: message}
    });
  }

  public confirm(tittle: string, contet: string, cancelTxtButton: string, confirmTxtButton, confirmFunction: any) {
    this.modalService.open(AlertConfirmComponent, {
      height: AlertConfirmComponent.height,
      width: AlertConfirmComponent.width,
      autoFocus: false,
      data: {
        title: tittle,
        content: contet,
        cancelTextButton: cancelTxtButton,
        confirmTextButton: confirmTxtButton,
        confirm: confirmFunction
      }
    });
  }

}
