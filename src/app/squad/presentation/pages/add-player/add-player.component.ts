import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../../../domain/models/player';
import { CreatePlayer } from '../../../domain/usecases/create-player';
import { ShowMessage } from '../../../../core/domain/usecases/show-message';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.scss',
})
export class AddPlayerComponent {
  constructor(
    private readonly createPlayer: CreatePlayer,
    private readonly router: Router,
    private readonly showMessage: ShowMessage
  ) {}

  create(player: Player): void {
    this.createPlayer.execute(player).subscribe((_) => {
      this.showMessage.execute(`Jogador ${player.name} salvo com sucesso`);
      this.router.navigate(['squad']);
    });
  }

  routeToSquad(): void {
    this.router.navigate(['squad']);
  }

}