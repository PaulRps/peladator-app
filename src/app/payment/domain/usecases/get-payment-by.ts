import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { IPaymentRepository } from '../repositories/payment.repository';
import { PaymentFilter } from '../models/payment-filter';

@Injectable({
  providedIn: 'root',
})
export class GetPaymentBy implements Usecase<PaymentFilter, Observable<Payment | undefined>> {
  constructor(@Inject(IPaymentRepository.name) private readonly paymentRepository: IPaymentRepository) {}

  execute(filter: PaymentFilter): Observable<Payment | undefined> {
    return this.paymentRepository.getPaymentBy(filter.month, filter.squadId, filter.id);
  }
}

