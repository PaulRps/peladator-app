import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../../../domain/models/payment';
import { FilterCustomers } from '../../../domain/usecases/filter-customers';
import { GetPaymentBy } from '../../../domain/usecases/get-payment-by';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss',
})
export class PaymentDetailsComponent {
  payment: Payment | undefined;
  customersMap: any = {};
  sumDailyPay = 0;
  sumMonthlyPay = 0;
  daysOfDailyPayment: string[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly getPaymentBy: GetPaymentBy,
    private readonly filterCustomers: FilterCustomers
  ) {}

  ngOnInit(): void {
    const monthPaymentId = this.route.snapshot.paramMap.get('id');
    this.getPaymentBy.execute({ id: monthPaymentId }).subscribe((payment) => {
      this.payment = payment;
      this.daysOfDailyPayment = Object.keys(payment?.customersDailyPaid || {});
      if (payment) {
        const dailyIds = <string[]>Object.values(payment.customersDailyPaid).flat();
        this.sumDailyPay = dailyIds.length * payment.dailyFee;
        this.sumMonthlyPay = payment.customersMonthlyPaid.length * payment.monthlyFee;

        const ids = [...dailyIds, ...payment.customersMonthlyPaid];
        this.filterCustomers.execute(ids).subscribe((customers) => {
          this.customersMap = customers.reduce((acc: any, customer) => {
            acc[customer.id] = customer;
            return acc;
          }, {});
        });
      }
    });
  }
}

