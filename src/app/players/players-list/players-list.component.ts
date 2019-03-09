import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import Swal from 'sweetalert2';
import { DialogService } from 'src/app/dialogService';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'age', 'skillLevel'];
  players: MatTableDataSource<Player> = new MatTableDataSource<Player>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private playersService: PlayersService, private dialogService: DialogService) { }
  
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
    .subscribe(players =>{
      this.players = new MatTableDataSource(players)
      this.players.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
  }

  deletePlayer(player){
    Swal({
      title: 'Deseja deletar o jogador ' + player.name + '?',
      text: "Não será possível reverter!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      if (result.value) {        
        this.playersService.deletePlayer(player.id).subscribe(
          (players: Player[]) => {
            this.players.data = players;
            this.dialogService.successMessage('Jogador deletado!');
          }
        );        
      }
    });
  }
}
