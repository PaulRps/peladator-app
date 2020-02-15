import { SharedModule } from '../../shared/shared.module';
import { PaymentsComponent } from './page/payments.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentsRoutingModule } from './payments.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [PaymentListComponent, PaymentFormComponent, PaymentsComponent],
  imports: [CommonModule, PaymentsRoutingModule, SharedModule, NgxMaskModule.forRoot()],
  entryComponents: [PaymentFormComponent],
})
export class PaymentsModule {}
