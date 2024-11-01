import { inject, Injectable } from '@angular/core';
import { Usecase } from './usecase';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ShowMessage implements Usecase<string, void> {
  private _snackBar = inject(MatSnackBar);

  execute(message: string): Observable<void> {
    return new Observable((observer) => {
      this._snackBar.open(message, 'Fechar');
      observer.complete();
    });
  }
}

