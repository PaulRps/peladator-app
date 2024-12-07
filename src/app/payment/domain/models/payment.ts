import { environment } from '../../../../environments/environment';

export class Payment {
  id: string;
  squadId: string;
  month: number;
  year: number;
  monthlyFee: number;
  dailyFee: number;
  customersMonthlyPaid: string[];
  customersDailyPaid: any;

  constructor({
    id,
    squadId,
    month,
    year,
    monthlyFee,
    dailyFee,
    customersMonthlyPaid,
    customersDailyPaid,
  }: Partial<Payment> = {}) {
    this.id = id || '';
    this.squadId = squadId || environment.squadId;
    this.month = month || 0;
    this.year = year || 0;
    this.monthlyFee = monthlyFee || 70;
    this.dailyFee = dailyFee || 20;
    this.customersMonthlyPaid = customersMonthlyPaid || [];
    this.customersDailyPaid = customersDailyPaid || {};
  }
}


