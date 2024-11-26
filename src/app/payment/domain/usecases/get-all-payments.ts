import { Inject, Injectable } from '@angular/core';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { IPaymentRepository } from '../repositories/payment.repository';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetAllPayments implements Usecase<void, Observable<Payment[]>> {
  constructor(@Inject(IPaymentRepository.name) private readonly paymentRepository: IPaymentRepository) {}

  execute(_: void): Observable<Payment[]> {
    return this.paymentRepository.getAll(environment.squadId);
  }
}

