import { Inject, Injectable } from '@angular/core';
import { IPaymentRepository } from '../repositories/payment.repository';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetCurrentPayment implements Usecase<void, Observable<Payment | undefined>> {
  constructor(@Inject(IPaymentRepository.name) private readonly paymentRepository: IPaymentRepository) {}

  execute(_: void): Observable<Payment | undefined> {
    const month = new Date().getMonth() + 1;
    return this.paymentRepository.getPaymentBy(month, environment.squadId);
  }
}


