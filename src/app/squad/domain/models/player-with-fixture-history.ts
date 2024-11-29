import { PlayerId } from './player';
import { SquadId } from './squad';

export class PlayerWithFixtureHistory {
  id: PlayerId;
  squadId: SquadId;
  name: string;
  position: string;
  level: number;
  history: FixtureHistory[];

  constructor({ id, name, position, level, history, squadId }: Partial<PlayerWithFixtureHistory> = {}) {
    this.id = id || '';
    this.name = name || '';
    this.position = position || '';
    this.level = level || 0;
    this.history = history || [];
    this.squadId = squadId || '';
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

