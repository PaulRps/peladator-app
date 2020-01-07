import { PlayerCrudComponent } from './../player-crud/player-crud.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from '../../../../shared/models/player.model';
import { SelectionModel } from '@angular/cdk/collections';
import { PlayerService } from '../../player.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { SortTeamsComponent } from 'src/app/modules/player/components/sort-teams/sort-teams.component';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'player'/* 'name', 'age', 'skillLevel' */];
  players: MatTableDataSource<Player> = new MatTableDataSource<Player>();
  selection = new SelectionModel<Player>(true, []);
  enablePlayersSelection = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('playerCrud', {static: true}) playerCrud: PlayerCrudComponent;

  constructor(private playerService: PlayerService,
              private dialogService: DialogService,
              private modalService: NgbModal,
              private authService: AuthService) { }

  ngOnInit() {
    this.paginator.hidePageSize = true;
    this.authService.getToken();
    this.getPlayers();
    this.playerService.playersEvent.subscribe(
      (players: Player[]) => {
        this.players.data = players;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
  }

  getPlayers(): void {
    this.playerService.getAll()
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

  update(player: Player) {
    this.playerCrud.updateDelete(player);
  }

  allowPlayersSelection() {
    this.enablePlayersSelection = true;
  }

  sortTeams() {
    this.enablePlayersSelection = false;
    if (this.selection.selected && this.selection.selected.length > 0) {
      this.playerService.sortTeams(this.selection.selected)
        .subscribe(teams => {
          this.selection.clear();
          this.openTeams(teams);
      });
    }
  }

 openTeams(teams) {
  const modalRef = this.modalService.open(SortTeamsComponent, {size : 'lg'});
  modalRef.componentInstance.teams = teams;
 }
}
