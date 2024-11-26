import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { PaymentRepository } from './data/repositories/payment.repository';
import { IPaymentRepository } from './domain/repositories/payment.repository';
import { PaymentRoutingModule } from './payment-routing.module';
import { ListCustomersComponent } from './presentation/pages/list-customers/list-customers.component';
import { ListPaymentsComponent } from './presentation/pages/list-payments/list-payments.component';

@NgModule({
  providers: [
    {
      provide: IPaymentRepository.name,
      useClass: PaymentRepository,
    },
  ],
  declarations: [ListCustomersComponent, ListPaymentsComponent],
  imports: [CommonModule, PaymentRoutingModule, CoreModule],
})
export class PaymentModule {}

