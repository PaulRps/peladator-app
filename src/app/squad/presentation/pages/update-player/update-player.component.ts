import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../../domain/models/player';
import { GetPlayerById } from '../../../domain/usecases/get-player-by-id';
import { UpdatePlayer } from '../../../domain/usecases/update-player';

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
    private readonly router: Router
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
      this.player = player;
      this.router.navigate(['squad']);
    });
  }
}

