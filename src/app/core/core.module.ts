import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './presentation/components/components.module';
import { MonthNamePipe } from './pipes/month-name.pipe';
import { BrazilianMoneyPipe } from './pipes/brazilian-money.pipe';

@NgModule({
  declarations: [MonthNamePipe, BrazilianMoneyPipe],
  imports: [CommonModule],
  exports: [ComponentsModule, MonthNamePipe, BrazilianMoneyPipe],
  providers: [MonthNamePipe, BrazilianMoneyPipe],
})
export class CoreModule {}








