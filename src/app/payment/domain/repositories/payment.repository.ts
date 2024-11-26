import { Observable } from 'rxjs';
import { Payment } from '../models/payment';

export interface IPaymentRepository {
  create(payment: Payment): Observable<string>;
  getPaymentByMonth(month: number, squadId: string): Observable<Payment | undefined>;
  getAll(squadId: string): Observable<Payment[]>;
  update(payment: Payment): Observable<void>;
}

export namespace IPaymentRepository {
  export const name = 'IPaymentRepository';
}

