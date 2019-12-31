import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    successMessage(message: string) {
        Swal({
            title: message,
            type: 'success'
        });
    }
    
    errorMessage(message: string) {
        Swal({
            title: message,
            type: 'error'
        });
    }

}
