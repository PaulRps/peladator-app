import { Player } from '../../../squad/domain/models/player';

class PaymentDetails {
  hasPaidDaily?: boolean;
  hasPaidMonthly?: boolean;
  status?: 'Pendente' | 'Diária' | 'Mensal' = 'Pendente';
}

export type Customer = Pick<Player, 'id' | 'name' | 'position'> & PaymentDetails;


