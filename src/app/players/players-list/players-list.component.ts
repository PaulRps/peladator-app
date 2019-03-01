import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'age', 'skillLevel'];
  players: MatTableDataSource<Player> = new MatTableDataSource<Player>();

  
  constructor(private playersService: PlayersService) { }
  
  ngOnInit() {
    this.getPlayers();
    
    this.playersService.onPlayerAdded.subscribe(
      (players: Player[]) => {
        this.players.data = players;
      }
    );
  }  

  getPlayers(): void {
    this.playersService.getPlayers()
    .subscribe(players => this.players = new MatTableDataSource(players));
  }

}
