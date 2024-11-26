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

  getPaymentByMonth(month: number, squadId: string): Observable<Payment | undefined> {
    return this.paymentService.getPaymentByMonth(month, squadId);
  }

  getAll(squadId: string): Observable<Payment[]> {
    return this.paymentService.getAll(squadId);
  }

  update(payment: Payment): Observable<void> {
    return this.paymentService.updatePayment(payment);
  }
}

