import Swal from 'sweetalert2';
import { ModalPlayerFormComponent } from './player-form/player-form.component';
import { AuthService } from '../core/service/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Player } from './player.model';
import { SelectionModel } from '@angular/cdk/collections';
import { PlayersService } from './players.service';
import { DialogService } from '../shared/dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudOperations } from '../shared/crud-operation.constants';
import { TeamsComponent } from '../modules/teams/teams.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'player'/* 'name', 'age', 'skillLevel' */];
  players: MatTableDataSource<Player> = new MatTableDataSource<Player>();
  selection = new SelectionModel<Player>(true, []);
  enablePlayersSelection = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private playersService: PlayersService,
              private dialogService: DialogService,
              private modalService: NgbModal,
              private authService: AuthService) { }

  ngOnInit() {
    this.paginator.hidePageSize = true;
    this.authService.getToken();
    this.getPlayers();
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
  }

  getPlayers(): void {
    this.playersService.getAll()
    .subscribe(players => {
      this.players = new MatTableDataSource(players);
      this.players.paginator = this.paginator;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.players.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Player): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.players.data.forEach(row => this.selection.select(row));
  }

  openForm(player: Player) {
    const modalRef = this.modalService.open(ModalPlayerFormComponent);
    modalRef.componentInstance.player = player;
    modalRef.componentInstance.newPlayerEvent.subscribe((result) => {
      if (CrudOperations.isEqual(result.operation, CrudOperations.CREATE)) {
        this.playersService.save(result.player)
          .subscribe((players: Player[]) => {
            if (players) {
              this.dialogService.successMessage('Jogador Adicionado!');
              this.players.data = players;
            } else {
              this.dialogService.errorMessage('Ocorreu um erro durante essa operação, tente novamente mais tarde.');
            }
        });
      } else  if (CrudOperations.isEqual(result.operation, CrudOperations.UPDATE)) {
        this.playersService.update(result.player)
          .subscribe((players: Player[]) => {
            if (players) {
              this.dialogService.successMessage('Jogador Atualizado!');
              this.players.data = players;
            } else {
              this.dialogService.errorMessage('Ocorreu um erro durante essa operação, tente novamente mais tarde.');
            }
        });
      } else if (CrudOperations.isEqual(result.operation, CrudOperations.DELETE)) {
        this.deletePlayer(result.player);
      }
    });
  }

  update(player: Player) {
    this.openForm(player);
  }

  deletePlayer(player) {
    Swal({
      title: 'Deseja deletar o jogador ' + player.name + '?',
      text: 'Não será possível reverter!',
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
            if (players) {
              this.players.data = players;
              this.dialogService.successMessage('Jogador deletado!');
            } else {
              this.dialogService.errorMessage('Ocorreu um erro durante essa operação, tente novamente mais tarde.');
            }
          }
        );
      }
    });
  }

  allowPlayersSelection() {
    this.enablePlayersSelection = true;
  }

  sortTeams() {
    this.enablePlayersSelection = false;
    if (this.selection.selected && this.selection.selected.length > 0) {
      this.playersService.sortTeams(this.selection.selected)
        .subscribe(teams => {
          this.selection.clear();
          this.openTeams(teams);
      });
    }
  }

 openTeams(teams) {
  const modalRef = this.modalService.open(TeamsComponent, {size : 'lg'});
  modalRef.componentInstance.teams = teams;
 } 

}
