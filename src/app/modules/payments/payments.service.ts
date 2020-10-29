import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { LoggerService } from 'src/app/core/services/logger.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const PAYMENT_URL = `${environment.apiUrl}/payment`;

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private paymentsEvent = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  getEvent(): Observable<any> {
    return this.paymentsEvent;
  }

  getFormData(): Observable<any> {
    return this.http.get(`${PAYMENT_URL}/form-data`).pipe(
      tap(_ => LoggerService.debug('fetched form-data', _)),
      catchError(LoggerService.handleError('form-data', undefined))
    );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(PAYMENT_URL).pipe(
      tap(_ => LoggerService.debug('fetched payments', _)),
      catchError(LoggerService.handleError('payments', undefined))
    );
  }

  save(payment: any): Observable<any[]> {
    return this.doRequestAndReturnAll(() => {
      return this.http.post<any>(PAYMENT_URL, payment, httpOptions).pipe(
        tap(paymnt => {
          LoggerService.debug('saved payments', paymnt);
        }),
        catchError(LoggerService.handleError('payments', undefined))
      );
    });
  }

  update(payment: any): Observable<any[]> {
    return this.doRequestAndReturnAll(() => {
      return this.http.put(PAYMENT_URL, payment, httpOptions).pipe(
        tap(_ => {
          LoggerService.debug('updated payments', payment);
        }),
        catchError(LoggerService.handleError('payments', undefined))
      );
    });
  }

  delete(id: any): Observable<any[]> {
    return this.doRequestAndReturnAll(() => {
      return this.http.delete(`${PAYMENT_URL}/${id}`).pipe(
        tap(_ => {
          LoggerService.debug('deleted payments', id);
        }),
        catchError(LoggerService.handleError('payments', undefined))
      );
    });
  }

  private doRequestAndReturnAll(callback: () => Observable<any>): Observable<any[]> {
    return new Observable(observer => {
      callback().subscribe(any =>
        this.getAll().subscribe(payments => {
          this.paymentsEvent.emit(payments);
          observer.next(payments);
        })
      );
    });
  }
}
