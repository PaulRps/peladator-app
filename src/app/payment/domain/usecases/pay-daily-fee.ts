import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Customer } from '../models/customer';
import { Payment } from '../models/payment';
import { CreatePayment } from './create-payment';
import { GetCurrentPayment } from './get-current-payment';
import { UpdatePayment } from './update-payment';

@Injectable({
  providedIn: 'root',
})
export class PayDailyFee implements Usecase<Customer, Observable<void>> {
  constructor(
    private readonly getCurrentPayment: GetCurrentPayment,
    private readonly updatePayment: UpdatePayment,
    private readonly createPayment: CreatePayment
  ) {}

  execute(customer: Customer): Observable<void> {
    return this.getCurrentPayment.execute().pipe(
      switchMap((payment) => {
        const day = new Date().toISOString().split('T')[0].split('-')[2];

        if (payment) {
          if (payment.customersDailyPaid && payment?.customersDailyPaid[day]) {
            payment.customersDailyPaid[day].push(customer.id);
          } else {
            payment.customersDailyPaid = {};
            payment.customersDailyPaid[day] = [customer.id];
          }
          return this.updatePayment.execute(payment);
        }

        const newPayment = new Payment({
          customersDailyPaid: {},
        });
        newPayment.customersDailyPaid[day] = [customer.id];

        return this.createPayment.execute(newPayment).pipe(map(() => {}));
      })
    );
  }
}

