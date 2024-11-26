import { Player } from '../../../squad/domain/models/player';

class PaymentDetails {
  hasPaidDaily?: boolean;
  hasPaidMonthly?: boolean;
  status?: 'Pendiente' | 'Diária' | 'Mensal' = 'Pendiente';
}

export type Customer = Pick<Player, 'id' | 'name' | 'position'> & PaymentDetails;

