import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../../domain/models/payment';
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly url = `${environment.apiUrl}/api/v1/payment`;

  constructor(private readonly http: HttpClient) {}

  getPaymentByMonth(month: number, squadId: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.url}?month=${month}&squadId=${squadId}`);
  }

  createPayment(payment: Payment): Observable<string> {
    return this.http.post<string>(`${this.url}`, payment, httpOptions);
  }

  updatePayment(payment: Payment): Observable<void> {
    return this.http.put<void>(`${this.url}`, payment, httpOptions);
  }

  getAll(squadId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.url}/all?squadId=${squadId}`);
  }
}

