import { PlayerId } from './player';
import { SquadId } from './squad';

export class PlayerWithFixtureAndPaymentHistory {
  id: PlayerId;
  squadId: SquadId;
  name: string;
  position: string;
  level: number;
  history: FixtureHistory[];
  hasPaid: boolean;

  constructor({
    id,
    name,
    position,
    level,
    history,
    squadId,
    hasPaid,
  }: Partial<PlayerWithFixtureAndPaymentHistory> = {}) {
    this.id = id || '';
    this.name = name || '';
    this.position = position || '';
    this.level = level || 0;
    this.history = history || [];
    this.squadId = squadId || '';
    this.hasPaid = hasPaid || false;
  }
}

export class FixtureHistory {
  fixtureId: string;
  date: string;

  constructor({ fixtureId, date }: Partial<FixtureHistory> = {}) {
    this.fixtureId = fixtureId || '';
    this.date = date || '';
  }
}



