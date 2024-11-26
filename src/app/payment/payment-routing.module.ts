import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomersComponent } from './presentation/pages/list-customers/list-customers.component';
import { ListPaymentsComponent } from './presentation/pages/list-payments/list-payments.component';

const routes: Routes = [
  {
    path: 'customers',
    component: ListCustomersComponent,
  },
  {
    path: '',
    component: ListPaymentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}

