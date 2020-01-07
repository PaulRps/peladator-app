import { PlayerService } from './../../../player/player.service';
import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/models/player.model';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  players: any;//{[key:string] : Player[]};
  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.groupByPosition().subscribe(response => {
      this.players = response;
    });
  }

  selectPlayer = (player: Player) => {
    player.isSelected = !player.isSelected;
  }

  originalOrder = (a: KeyValue<string, Player[]>, b: KeyValue<string, Player[]>): number => {
    return 0;
  }

  keyDescOrder = (a: KeyValue<string, Player[]>, b: KeyValue<string, Player[]>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

}
