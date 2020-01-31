import { DialogService } from 'src/app/core/services/dialog.service';
import { TeamsService } from '../teams.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/models/player.model';
import { KeyValue } from '@angular/common';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  players: any; // {[key:string] : Player[]};
  sortTeamForm: FormGroup;
  amount: number;
  sortFields: any[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  fieldIsSelected = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  sortStrategies: any[];
  constructor(private dialogService: DialogService, private teamService: TeamsService, private router: Router) {}

  ngOnInit() {
    this.sortTeamForm = new FormGroup({
      amount: new FormControl(null, [Validators.required]),
      teamSize: new FormControl(null, [Validators.required]),
    });
    this.teamService.loadTeamsPage().subscribe(response => {
      this.players = response.playersGroupedByPosition;
      this.sortStrategies = response.sortStrategies;
    });
    this.sortFields = [{ id: 0, name: 'Nível' }];
  }

  sort() {
    if (this.sortTeamForm.invalid) {
      this.sortTeamForm.markAllAsTouched();
      return;
    }
    const selectedPlayers: Player[] = [];
    Object.keys(this.players).forEach(k => {
      this.players[k].forEach(p => {
        if (p.isSelected) {
          selectedPlayers.push(p);
        }
      });
    });

    if (selectedPlayers.length < this.sortTeamForm.value.amount) {
      this.dialogService.warnMessage('A quantidade de jogadores selecionados é insuficiente!', '200px');
      return;
    }

    this.teamService
      .sort({
        amount: this.sortTeamForm.value.amount,
        teamSize: this.sortTeamForm.value.teamSize,
        sortStrategy: this.sortFields.length > 1 ? this.sortFields[1] : null, // TODO: adjust this field
        players: selectedPlayers,
      })
      .subscribe(response => {
        if (response && response.length > 0) {
          this.router.navigateByUrl('/teams/sorted', { state: response });
        }
      });
  }

  selectPlayer = (player: Player) => {
    player.isSelected = !player.isSelected;
  };

  selectAllPlayer = (players: Player[]): void => {
    for (const p of players) {
      this.selectPlayer(p);
    }
  };

  originalOrder = (a: KeyValue<string, Player[]>, b: KeyValue<string, Player[]>): number => {
    return 0;
  };

  keyDescOrder = (a: KeyValue<string, Player[]>, b: KeyValue<string, Player[]>): number => {
    return a.key > b.key ? -1 : b.key > a.key ? 1 : 0;
  };

  add(field): void {
    if (field) {
      if (this.sortFields.indexOf(field) < 0) {
        this.sortFields.push(field);
        field.isSelected = true;
      }
    }
  }

  remove(field): void {
    if (field.id === 0 && field.name === 'Nível') {
      return;
    }
    const index = this.sortFields.indexOf(field);
    if (index >= 0) {
      this.sortFields.splice(index, 1);
      field.isSelected = false;
    }
  }
}
