import { Component, OnInit } from '@angular/core';
import { CreatePlayer } from '../../../domain/usecases/create-player';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from '../../../domain/models/player';
import { Router } from '@angular/router';
import { GetPlayerPositions } from '../../../domain/usecases/get-player-positions';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.scss',
})
export class AddPlayerComponent implements OnInit {
  playerForm: FormGroup;
  playerPositions: string[] = [];
  constructor(
    private readonly createPlayer: CreatePlayer,
    private readonly getPlayerPositions: GetPlayerPositions,
    private readonly roouter: Router
  ) {
    this.playerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      level: new FormControl(1, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getPlayerPositions.execute().subscribe((response) => {
      this.playerPositions = response;
    });
  }

  create(): void {
    if (this.playerForm.invalid) {
      this.playerForm.markAllAsTouched();
      return;
    }

    const player = new Player({
      name: this.playerForm.get('name')?.value,
      position: this.playerForm.get('position')?.value,
      level: this.playerForm.get('level')?.value,
    });

    this.createPlayer.execute(player).subscribe((_) => {
      this.playerForm.reset();
      this.roouter.navigate(['squad']);
    });
  }
}

