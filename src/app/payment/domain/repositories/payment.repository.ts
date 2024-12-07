import { Observable } from 'rxjs';
import { Payment } from '../models/payment';

export interface IPaymentRepository {
  create(payment: Payment): Observable<string>;
  getPaymentBy(month?: number | null, squadId?: string | null, id?: string | null): Observable<Payment | undefined>;
  getAll(squadId: string): Observable<Payment[]>;
  update(payment: Payment): Observable<void>;
}

export namespace IPaymentRepository {
  export const name = 'IPaymentRepository';
}




