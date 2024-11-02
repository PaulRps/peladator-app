import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../../../domain/models/player';
import { CreatePlayer } from '../../../domain/usecases/create-player';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.scss',
})
export class AddPlayerComponent {
  constructor(private readonly createPlayer: CreatePlayer, private readonly roouter: Router) {}

  create(player: Player): void {
    this.createPlayer.execute(player).subscribe((_) => {
      this.roouter.navigate(['squad']);
    });
  }
}

