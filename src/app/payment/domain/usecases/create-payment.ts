import { Inject, Injectable } from '@angular/core';
import { IPaymentRepository } from '../repositories/payment.repository';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreatePayment implements Usecase<Payment, Observable<string>> {
  constructor(@Inject(IPaymentRepository.name) private readonly paymentRepository: IPaymentRepository) {}

  execute(payment: Payment): Observable<string> {
    payment.month = new Date().getMonth() + 1;
    return this.paymentRepository.create(payment);
  }
}

