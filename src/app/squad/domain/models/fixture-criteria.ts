import { Player } from './player';
import { SquadId } from './squad';

export class FixtureCriteria {
  squadId: SquadId;
  amountPlayersInLineUp: number;
  players: Player[];

  constructor({
    squadId,
    amountPlayersInLineUp,
    players,
  }: {
    squadId?: SquadId;
    amountPlayersInLineUp?: number;
    players?: Player[];
  } = {}) {
    this.squadId = squadId || '';
    this.amountPlayersInLineUp = amountPlayersInLineUp || 0;
    this.players = players || [];
  }
}

