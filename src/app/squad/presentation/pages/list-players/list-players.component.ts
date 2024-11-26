import { Component, OnInit } from '@angular/core';
import { ShowDialog } from '../../../../core/domain/usecases/show-dialog';
import { ShowMessage } from '../../../../core/domain/usecases/show-message';
import { ColumnData } from '../../../../core/presentation/components/table/column-data';
import { Player } from '../../../domain/models/player';
import { DeletePlayer } from '../../../domain/usecases/delete-player';
import { GetAllPlayers } from '../../../domain/usecases/get-all-players';
import { SavePlayerForFixture } from '../../../domain/usecases/save-player-for-fixture';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.scss',
})
export class ListPlayersComponent implements OnInit {
  protected dataTable: Player[] = [];
  protected addButton = {
    color: 'primary',
    text: 'Jogador',
    routerLink: 'add-player',
  };
  protected columnData: ColumnData[] = [
    {
      label: 'Nome',
      name: 'name',
    },
    {
      label: 'Posição',
      name: 'position',
    },
    {
      label: 'Nível',
      name: 'level',
    },
  ];

  constructor(
    private readonly getAllPlayers: GetAllPlayers,
    private readonly showDialog: ShowDialog,
    private readonly deletePlayer: DeletePlayer,
    private readonly savePlayerForFixture: SavePlayerForFixture,
    private readonly showMessage: ShowMessage,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPlayers.execute().subscribe((players) => {
      this.dataTable = players;
    });
  }

  protected delete(player: Player): void {
    this.showDialog.execute({
      title: 'Deletar jogador',
      content: `Deseja deletar o jogador ${player.name}?`,
      confirmTextButton: 'Sim',
      cancelTextButton: 'Não',
      onConfirm: () => {
        this.deletePlayer.execute(player.id!).subscribe(() => {
          this.ngOnInit();
        });
      },
    });
  }

  protected saveForFixture(player: Player): void {
    this.savePlayerForFixture.execute(player).subscribe(() => {
      this.showMessage.execute(`Jogador ${player.name} selecionado para a partida`);
    });
  }

  protected edit(player: Player): void {
    this.router.navigate([`update-player/${player.id}`]);
  }
}

