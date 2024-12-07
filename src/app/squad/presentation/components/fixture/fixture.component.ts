import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ShowMessage } from '../../../../core/domain/usecases/show-message';
import { Fixture } from '../../../domain/models/fixture';
import { LineUp } from '../../../domain/models/lineup';
import { PlayerForFixture } from '../../../domain/models/player-for-fixture';
import { UpdateFixture } from '../../../domain/usecases/update-fixture';
import { ShowDialog } from '../../../../core/domain/usecases/show-dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrl: './fixture.component.scss',
})
export class FixtureComponent implements OnChanges {
  @Input() fixture?: Fixture;

  lineUps: any[] = [];
  hasLineupChanged: boolean = false;
  @ViewChild('MovePlayerDialog') movePlayerHtmlRef?: TemplateRef<any>;
  movePlayerFormControl: FormControl;

  constructor(
    private readonly updateFixture: UpdateFixture,
    private readonly showMessage: ShowMessage,
    private readonly showDialog: ShowDialog
  ) {
    this.movePlayerFormControl = new FormControl(null);
  }

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
    this.showDialog.execute({
      title: `Mover ${player.name}`,
      htmlContentTemplate: this.movePlayerHtmlRef,
      confirmTextButton: 'Mover',
      cancelTextButton: 'Cancelar',
      onCancel: () => {},
      onConfirm: () => {
        const otherLineup = this.movePlayerFormControl.value;

        if (otherLineup === squadIndex) {
          this.showMessage.execute(`${player.name} já está no Time ${squadIndex + 1}`);
          return;
        }

        if (player && squadIndex >= 0 && squadIndex < this.lineUps.length && playerIndex >= 0) {
          this.lineUps[otherLineup].players.push(player);
          this.lineUps[squadIndex].players.splice(playerIndex, 1);
          player.hovered = null;
          this.hasLineupChanged = true;
        }
        this.movePlayerFormControl = new FormControl(null);
      },
    });
  }

  update(): void {
    if (!this.fixture) return;

    this.updateFixture.execute(this.fixture).subscribe(() => {
      this.hasLineupChanged = false;
      this.showMessage.execute('Times atualizados com sucesso!');
    });
  }
}

