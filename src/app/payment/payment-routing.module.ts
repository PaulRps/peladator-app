import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomersComponent } from './presentation/pages/list-customers/list-customers.component';
import { ListPaymentsComponent } from './presentation/pages/list-payments/list-payments.component';
import { PaymentDetailsComponent } from './presentation/pages/payment-details/payment-details.component';

const routes: Routes = [
  {
    path: 'customers',
    component: ListCustomersComponent,
  },
  {
    path: '',
    component: ListPaymentsComponent,
  },
  {
    path: ':id/details',
    component: PaymentDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}







