import { Player } from './player';
import { SquadId } from './squad';

export class FixtureCriteria {
  squadId: SquadId;
  amountPlayersInLineUp: number;
  players: Player[];
  priorityPlayers: Player[];

  constructor({ squadId, amountPlayersInLineUp, players, priorityPlayers }: Partial<FixtureCriteria> = {}) {
    this.squadId = squadId || '';
    this.amountPlayersInLineUp = amountPlayersInLineUp || 0;
    this.players = players || [];
    this.priorityPlayers = priorityPlayers || [];
  }
}


