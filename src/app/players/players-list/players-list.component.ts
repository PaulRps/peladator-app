import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import Swal from 'sweetalert2';
import { DialogService } from 'src/app/dialogService';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'name', 'age', 'skillLevel'];
  players: MatTableDataSource<Player> = new MatTableDataSource<Player>();
  selection = new SelectionModel<Player>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private playersService: PlayersService, private dialogService: DialogService) { }
  
  ngOnInit() {
    
    // this.paginator._intl.firstPageLabel = ""; 
    this.paginator.hidePageSize = true;

    this.getPlayers();
    
    // this.playersService.onPlayerAdded.subscribe(
    //   (players: Player[]) => {
    //     this.players.data = players;
    //   }
    // );
  }  

  getPlayers(): void {
    this.playersService.getAll()
    .subscribe(players =>{
      this.players = new MatTableDataSource(players)
      this.players.paginator = this.paginator;
      console.log(this.paginator);
    });
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.players.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.players.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Player): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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
        this.playersService.delete(player.id).subscribe(
          (players: Player[]) => {
            this.players.data = players;
            this.dialogService.successMessage('Jogador deletado!');
          }
        );        
      }
    });
  }
}
