import { Inject, Injectable } from '@angular/core';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { IPaymentRepository } from '../repositories/payment.repository';

@Injectable({
  providedIn: 'root',
})
export class UpdatePayment implements Usecase<Payment, Observable<void>> {
  constructor(@Inject(IPaymentRepository.name) private readonly paymentRepository: IPaymentRepository) {}

  execute(payment: Payment): Observable<void> {
    return this.paymentRepository.update(payment);
  }
}

