import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../../domain/models/player';
import { GetPlayerById } from '../../../domain/usecases/get-player-by-id';
import { UpdatePlayer } from '../../../domain/usecases/update-player';
import { ShowMessage } from '../../../../core/domain/usecases/show-message';

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrl: './update-player.component.scss',
})
export class UpdatePlayerComponent implements OnInit {
  player?: Player;

  constructor(
    private readonly getPlayerById: GetPlayerById,
    private readonly updatePlayer: UpdatePlayer,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly showMessage: ShowMessage
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const playerId = params['id'];
      this.getPlayerById.execute(playerId).subscribe((player) => {
        this.player = player;
      });
    });
  }

  update(player: Player): void {
    this.updatePlayer.execute(player).subscribe(() => {
      this.showMessage.execute(`Jogador ${player.name} atualizado com sucesso`);
      this.player = player;
      this.router.navigate(['squad']);
    });
  }

  routeToSquad() {
    this.router.navigate(['squad']);
  }
}



