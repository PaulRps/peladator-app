import { Component, OnInit } from '@angular/core';
import { GetAllPayments } from '../../../domain/usecases/get-all-payments';
import { Payment } from '../../../domain/models/payment';
import { ColumnData } from '../../../../core/presentation/components/table/column-data';
import { MonthNamePipe } from '../../../../core/pipes/month-name.pipe';
import { BrazilianMoneyPipe } from '../../../../core/pipes/brazilian-money.pipe';
import { Router } from '@angular/router';

type ExtendedPayment = Payment & { revenue: number };

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrl: './list-payments.component.scss',
})
export class ListPaymentsComponent implements OnInit {
  payments: ExtendedPayment[] = [];
  revenue: number = 0;
  protected columnData: ColumnData[];

  constructor(
    private readonly getAllPayments: GetAllPayments,
    private readonly monthNamePipe: MonthNamePipe,
    private readonly brazilianMoneyPipe: BrazilianMoneyPipe,
    private readonly router: Router
  ) {
    this.columnData = [
      {
        label: 'Mês',
        name: 'month',
        pipe: this.monthNamePipe,
      },
      {
        label: 'Receita',
        name: 'revenue',
        pipe: this.brazilianMoneyPipe,
      },
    ];
  }

  ngOnInit(): void {
    this.getAllPayments.execute().subscribe((payments) => {
      this.payments = payments.map((payment) => {
        const p = { ...payment, revenue: 0 };

        p.revenue += (p.customersMonthlyPaid?.length || 0) * p.monthlyFee;
        Object.keys(p.customersDailyPaid).forEach((day) => {
          p.revenue += (p.customersDailyPaid[day].length || 0) * p.dailyFee;
        });
        this.revenue += p.revenue;
        return p;
      });
    });
  }

  goToPaymentReport(payment: any): void {
    this.router.navigate([`payments/${payment.id}/details`]);
  }
}








