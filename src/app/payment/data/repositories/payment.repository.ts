import { Injectable } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs';
import { Payment } from '../../domain/models/payment';
import { IPaymentRepository } from '../../domain/repositories/payment.repository';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(private readonly paymentService: PaymentService) {}

  create(payment: Payment): Observable<string> {
    return this.paymentService.createPayment(payment);
  }

  getPaymentBy(month: number, squadId: string, id: string): Observable<Payment | undefined> {
    return this.paymentService.getPaymentBy(month, squadId, id);
  }

  getAll(squadId: string): Observable<Payment[]> {
    return this.paymentService.getAll(squadId);
  }

  update(payment: Payment): Observable<void> {
    return this.paymentService.updatePayment(payment);
  }
}




