import { Component, OnInit } from '@angular/core';
import { ShowMessage } from '../../../../core/domain/usecases/show-message';
import { ColumnData } from '../../../../core/presentation/components/table/column-data';
import { Customer } from '../../../domain/models/customer';
import { Payment } from '../../../domain/models/payment';
import { GetCustomersWithPaymentStatus } from '../../../domain/usecases/get-customers-with-payment-status';
import { PayDailyFee } from '../../../domain/usecases/pay-daily-fee';
import { PayMonthlyFee } from '../../../domain/usecases/pay-montly-fee';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.scss',
})
export class ListCustomersComponent implements OnInit {
  protected dataTable: Customer[] = [];

  protected columnData: ColumnData[] = [
    {
      label: 'Nome',
      name: 'name',
    },
    {
      label: 'Posição',
      name: 'position',
    },
    {
      label: 'Pagamento',
      name: 'status',
    },
  ];

  protected currentPayment?: Payment;

  constructor(
    private readonly getCustomers: GetCustomersWithPaymentStatus,
    private readonly payMonthlyFe: PayMonthlyFee,
    private readonly payDailyFe: PayDailyFee,
    private readonly showMessage: ShowMessage
  ) {}

  ngOnInit(): void {
    this.getCustomers.execute().subscribe((players) => (this.dataTable = players));
  }

  payMonthlyFee(customer: Customer): void {
    if (customer.hasPaidMonthly) {
      this.showMessage.execute(`${customer.name} já pagou a mensalidade!`);
      return;
    }
    if (customer.hasPaidDaily) {
      this.showMessage.execute(`${customer.name} já pagou a diária!`);
      return;
    }

    this.payMonthlyFe.execute(customer).subscribe(() => {
      this.showMessage.execute(`Mensalidade de ${customer.name} paga com sucesso!`);
      this.ngOnInit();
    });
  }

  payDailyFee(customer: Customer): void {
    if (customer.hasPaidMonthly) {
      this.showMessage.execute(`${customer.name} já pagou a mensalidade!`);
      return;
    }
    if (customer.hasPaidDaily) {
      this.showMessage.execute(`${customer.name} já pagou a diária!`);
      return;
    }

    this.payDailyFe.execute(customer).subscribe(() => {
      this.showMessage.execute(`Diária de ${customer.name} paga com sucesso!`);
      this.ngOnInit();
    });
  }
}

