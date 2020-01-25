import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public successMessage(message: string) {
    Swal({
      title: message,
      type: 'success'
    });
  }

  public errorMessage(message: string) {
    Swal({
      title: message,
      type: 'error'
    });
  }

  public warnMessage(message: string) {
    Swal({
      title: message,
      type: 'warning'
    });
  }

  public infoMessage(message: string) {
    Swal({
      title: message,
      type: 'info'
    });
  }

}
