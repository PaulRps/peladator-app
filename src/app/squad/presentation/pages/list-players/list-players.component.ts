import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowDialog } from '../../../../core/domain/usecases/show-dialog';
import { ShowMessage } from '../../../../core/domain/usecases/show-message';
import { ColumnData } from '../../../../core/presentation/components/table/column-data';
import { Player } from '../../../domain/models/player';
import { PlayerWithFixtureAndPaymentHistory } from '../../../domain/models/player-with-fixture-history';
import { DeletePlayer } from '../../../domain/usecases/delete-player';
import { GetPlayersWithFixtureAndPaymentHistory } from '../../../domain/usecases/get-players-with-fixture-and-payment-history';
import { SavePlayerForFixture } from '../../../domain/usecases/save-player-for-fixture';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.scss',
})
export class ListPlayersComponent implements OnInit {
  protected dataTable: PlayerWithFixtureAndPaymentHistory[] = [];
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
    private readonly getPlayersWithFixtureAndPaymentHistory: GetPlayersWithFixtureAndPaymentHistory,
    private readonly showDialog: ShowDialog,
    private readonly deletePlayer: DeletePlayer,
    private readonly savePlayerForFixture: SavePlayerForFixture,
    private readonly showMessage: ShowMessage,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getPlayersWithFixtureAndPaymentHistory.execute().subscribe((players) => {
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

  protected showFixtureHistory(player: PlayerWithFixtureAndPaymentHistory): void {
    const fixtureHistory =
      player.history
        ?.map((fixture) => new Date(fixture.date))
        ?.sort((a: any, b: any) => b.getTime() - a.getTime())
        ?.map((date: any) =>
          date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        )
        ?.join('<br>') || 'Nenhum jogo';

    this.showDialog.execute({
      title: `Histórico de jogos de ${player.name}`,
      htmlContent: fixtureHistory,
      confirmTextButton: 'Fechar',
      onConfirm: () => {},
    });
  }

  protected applyFilter(event: Event, data: any): void {
    const filterValue = (event.target as HTMLInputElement).value;
    data.filter = filterValue;
  }

  protected filterByPaid(data: any, paidOption: any): void {
    if (paidOption.selected) {
      data.cached = data.data;
      data.data = data.filteredData.filter((player: any) => player.hasPaid);
    } else {
      data.data = data.cached;
    }
  }

  protected createPlayer(): void {
    this.router.navigate(['add-player']);
  }
}




