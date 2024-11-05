import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Fixture } from '../../../domain/models/fixture';
import { LineUp } from '../../../domain/models/lineup';
import { PlayerForFixture } from '../../../domain/models/player-for-fixture';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrl: './fixture.component.scss',
})
export class FixtureComponent implements OnChanges {
  @Input() fixture?: Fixture;

  lineUps: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fixture'].currentValue) {
      changes['fixture'].currentValue.lineUps.forEach((squad: LineUp) => {
        squad?.players?.sort((a: PlayerForFixture, b: PlayerForFixture) => a.sequence - b.sequence);
      });

      this.lineUps = changes['fixture'].currentValue.lineUps;
    }
  }

  showActions(player: any): void {
    player.hovered = true;
  }

  hideActions(player: any): void {
    player.hovered = null;
  }

  move(player: any, playerIndex: number, squadIndex: number): void {
    const validIndexes = [0, 1];
    if (player && validIndexes.includes(squadIndex) && validIndexes.includes(playerIndex)) {
      const otherSquad = squadIndex == 0 ? 1 : 0;
      this.lineUps[otherSquad].players.push(player);
      this.lineUps[squadIndex].players.splice(playerIndex, 1);
      player.hovered = null;
    }
  }
}




