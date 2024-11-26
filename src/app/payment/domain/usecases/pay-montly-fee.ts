import { Injectable } from '@angular/core';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Customer } from '../models/customer';
import { map, Observable, switchMap } from 'rxjs';
import { CreatePayment } from './create-payment';
import { GetCurrentPayment } from './get-current-payment';
import { UpdatePayment } from './update-payment';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root',
})
export class PayMonthlyFee implements Usecase<Customer, Observable<void>> {
  constructor(
    private readonly getCurrentPayment: GetCurrentPayment,
    private readonly updatePayment: UpdatePayment,
    private readonly createPayment: CreatePayment
  ) {}

  execute(customer: Customer): Observable<void> {
    return this.getCurrentPayment.execute().pipe(
      switchMap((payment) => {
        if (payment) {
          payment.customersMonthlyPaid.push(customer.id);
          return this.updatePayment.execute(payment);
        }

        return this.createPayment
          .execute(
            new Payment({
              customersMonthlyPaid: [customer.id],
            })
          )
          .pipe(map(() => {}));
      })
    );
  }
}
