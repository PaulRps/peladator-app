import { TeamService } from './../team.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerService } from './../../player/player.service';
import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/models/player.model';
import { KeyValue } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  players: any;//{[key:string] : Player[]};
  sortTeamForm: FormGroup;
  amount: number;
  constructor(private playerService: PlayerService,
              private teamService: TeamService,
              private router: Router) {}

  ngOnInit() {
    this.sortTeamForm = new FormGroup({
      amount: new FormControl(null, [Validators.required])
    });
    this.playerService.groupByPosition().subscribe(response => {
      this.players = response;
    });
  }

  sort() {
    if (this.sortTeamForm.invalid) {
      this.sortTeamForm.markAllAsTouched();
      return;
    }

    const selectedPlayers: Player[] = [];
    Object.keys(this.players).forEach((k) => {
      this.players[k].forEach(p => {
        if (p.isSelected) {
          selectedPlayers.push(p);
        }
      });
    });
    this.teamService.sort({amount: this.amount, players: selectedPlayers})
      .subscribe((response) => {
        if (response && response.length > 0) {
          this.router.navigateByUrl('/teams/sorted', { state: response });
        }
      });
  }

  selectPlayer = (player: Player) => {
    player.isSelected = !player.isSelected;
  }

  selectAllPlayer = (players: Player[]): void => {
    for (let p of players) {
      this.selectPlayer(p);
    }
  }

  originalOrder = (a: KeyValue<string, Player[]>, b: KeyValue<string, Player[]>): number => {
    return 0;
  }

  keyDescOrder = (a: KeyValue<string, Player[]>, b: KeyValue<string, Player[]>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

}
