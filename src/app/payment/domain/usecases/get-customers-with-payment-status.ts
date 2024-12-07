import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Customer } from '../models/customer';
import { GetCurrentPayment } from './get-current-payment';
import { GetCustomers } from './get-customers';

@Injectable({
  providedIn: 'root',
})
export class GetCustomersWithPaymentStatus implements Usecase<void, Observable<Customer[]>> {
  constructor(private readonly getCustomers: GetCustomers, private readonly getCurrentPayment: GetCurrentPayment) {}

  execute(_: void): Observable<Customer[]> {
    return this.getCustomers.execute().pipe(
      switchMap((customers) => {
        return this.getCurrentPayment.execute().pipe(
          map((payment) => {
            const currentDay = new Date().toISOString().split('T')[0].split('-')[2];

            customers.forEach((customer) => {
              customer.status = 'Pendente';
              if (payment?.customersDailyPaid && payment?.customersDailyPaid[currentDay]?.includes(customer.id)) {
                customer.hasPaidDaily = true;
                customer.status = 'Diária';
              }
              if (payment?.customersMonthlyPaid && payment?.customersMonthlyPaid.includes(customer.id)) {
                customer.hasPaidMonthly = true;
                customer.status = 'Mensal';
              }
            });

            return customers;
          })
        );
      })
    );
  }
}


