import { PlayerFormComponent } from './../player-form/player-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from '../../../../shared/models/player.model';
import { SelectionModel } from '@angular/cdk/collections';
import { PlayersService } from '../../players.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  displayedColumns: string[] = ['player'];
  players: MatTableDataSource<Player> = new MatTableDataSource<Player>();
  selection = new SelectionModel<Player>(true, []);
  enablePlayersSelection = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private playerService: PlayersService, private modalService: MatDialog) {}

  ngOnInit() {
    this.paginator.hidePageSize = true;
    this.getPlayers();
    this.playerService.playersEvent.subscribe((players: Player[]) => {
      this.players.data = players;
    });
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
  }

  getPlayers(): void {
    this.playerService.getAll().subscribe(players => {
      this.players = new MatTableDataSource(players);
      this.players.paginator = this.paginator;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.players.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: Player): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.players.data.forEach(row => this.selection.select(row));
  }

  select(row) {
    this.modalService.open(PlayerFormComponent, {
      autoFocus: false,
      data: row,
    });
  }

  create() {
    this.modalService.open(PlayerFormComponent, {
      autoFocus: false,
    });
  }

  allowPlayersSelection() {
    this.enablePlayersSelection = true;
  }
}
