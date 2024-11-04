import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShowDialog } from '../../../../core/domain/usecases/show-dialog';
import { Player } from '../../../domain/models/player';
import { DeletePlayer } from '../../../domain/usecases/delete-player';
import { GetAllPlayers } from '../../../domain/usecases/get-all-players';
import { SavePlayerForFixture } from '../../../domain/usecases/save-player-for-fixture';
import { ShowMessage } from '../../../../core/domain/usecases/show-message';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.scss',
})
export class ListPlayersComponent implements OnInit {
  data: MatTableDataSource<Player> = new MatTableDataSource();
  displayedColumns: string[] = [/* 'id', */ 'name', 'position', 'level' /* , 'actions' */];

  constructor(
    private readonly getAllPlayers: GetAllPlayers,
    private readonly showDialog: ShowDialog,
    private readonly deletePlayer: DeletePlayer,
    private readonly savePlayerForFixture: SavePlayerForFixture,
    private readonly showMessage: ShowMessage
  ) {}

  ngOnInit(): void {
    this.getAllPlayers.execute().subscribe((players) => {
      this.data = new MatTableDataSource(players);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  showActions(row: any): void {
    row.hovered = true;
  }

  hideActions(row: any): void {
    row.hovered = null;
  }

  delete(player: Player) {
    this.showDialog.execute({
      title: 'Deletar jogador',
      content: `Deseja deletar o jogador ${player.name}?`,
      confirmTextButton: 'Sim',
      cancelTextButton: 'Não',
      onConfirm: () => {
        this.deletePlayer.execute(player.id || '').subscribe(() => {
          this.ngOnInit();
        });
      },
      onCancel: () => {},
    });
  }

  saveForFixture(player: Player) {
    this.savePlayerForFixture.execute(player).subscribe(() => {
      this.showMessage.execute(`Jogador ${player.name} selecionado para a partida`);
    });
  }
}

