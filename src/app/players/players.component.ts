import { PlayerFormComponent } from './player-form/player-form.component';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Player } from './player';
import { SelectionModel } from '@angular/cdk/collections';
import { PlayersService } from './players.service';
import { DialogService } from '../dialogService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  
  displayedColumns: string[] = ['select', 'id', 'name', 'age', 'skillLevel'];
  players: MatTableDataSource<Player> = new MatTableDataSource<Player>();
  selection = new SelectionModel<Player>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private playersService: PlayersService, 
              private dialogService: DialogService,
              private modalService: NgbModal,
              private authService: AuthService) { }
  
  ngOnInit() {
    this.paginator.hidePageSize = true;
    // this.authService.getToken();
    this.getPlayers();
  }  

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
  }

  getPlayers(): void {
    this.playersService.getAll()
    .subscribe(players =>{
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

  open() {
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
    const modalRef = this.modalService.open(PlayerFormComponent);
    modalRef.componentInstance.player = new Player(null, null, null, null);

  }

}
