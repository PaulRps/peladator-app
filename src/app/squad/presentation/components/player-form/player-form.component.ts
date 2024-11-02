import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from '../../../domain/models/player';
import { GetPlayerPositions } from '../../../domain/usecases/get-player-positions';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.scss',
})
export class PlayerFormComponent implements OnChanges, OnInit {
  @Input() player?: Player;
  @Output() onSave = new EventEmitter<Player>();

  playerForm: FormGroup;
  playerPositions: string[] = [];
  selectedPlayerLevel?: string;
  constructor(private readonly getPlayerPositions: GetPlayerPositions) {
    this.playerForm = new FormGroup({
      name: new FormControl(this.player?.name || '', Validators.required),
      position: new FormControl(this.player?.position || '', Validators.required),
      level: new FormControl(this.player?.level || null, Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['player'].currentValue) {
      this.playerForm.patchValue({
        name: changes['player'].currentValue.name,
        position: changes['player'].currentValue.position,
      });
      this.selectedPlayerLevel = `${changes['player'].currentValue.level}`;
    }
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

    if (this.player?.id) {
      this.player.name = this.playerForm.get('name')?.value;
      this.player.position = this.playerForm.get('position')?.value;
      this.player.level = this.playerForm.get('level')?.value;
    } else {
      this.player = new Player({
        name: this.playerForm.get('name')?.value,
        position: this.playerForm.get('position')?.value,
        level: this.playerForm.get('level')?.value,
      });
    }

    this.onSave.emit(this.player);
  }
}

