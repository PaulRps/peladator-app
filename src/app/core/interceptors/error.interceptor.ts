import { LoggerService } from './../services/logger.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private dialogService: DialogService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 /* || err.status === 403 */) {
          this.authService.logout();
          // location.reload();
        } else if (err.status === 403) {
          this.dialogService.errorMessage('Usuário não tem permissão para executar essa operação!', '200px');
        }
        LoggerService.log('error interceptor', err);
        const error = err.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
