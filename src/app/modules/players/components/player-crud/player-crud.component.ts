import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../players.service';
import { Player } from 'src/app/shared/models/player.model';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { DialogService } from 'src/app/core/services/dialog.service';
import { CrudOperations } from 'src/app/shared/constants/crud-operation';
import {MatDialog} from '@angular/material/dialog';
import { Input } from '@angular/core';

@Component({
  selector: 'app-player-crud',
  templateUrl: './player-crud.component.html',
  styleUrls: ['./player-crud.component.scss']
})
export class PlayerCrudComponent implements OnInit {

  @Input() floatMode: boolean;

  constructor(private modalService: MatDialog,
              private dialogService: DialogService,
              private playerService: PlayersService) { }

  ngOnInit() {}

  private openForm(player?: Player) {
    const dialogRef = this.modalService.open(PlayerFormComponent, {
      autoFocus: false,
      data: player
    });
    return dialogRef.afterClosed();
  }

  create() {
    this.openForm()
      .subscribe(newPlayer => {
        if (!newPlayer) { return; }
        this.playerService.save(newPlayer)
          .subscribe(response => {
            if (!response) {
              this.dialogService.errorMessage('Ocorreu um erro durante essa operação, tente novamente mais tarde.');
            }
          });
      });
  }

  public updateDelete(player: Player) {
    this.openForm(player)
      .subscribe(result => {
        if (result && CrudOperations.isEqual(CrudOperations.UPDATE, result.operation)) {
          this.playerService.update(result.player)
            .subscribe((players: Player[]) => {
              if (!players) {
                this.dialogService.errorMessage('Ocorreu um erro durante essa operação, tente novamente mais tarde.');
              }
            });
        } else if (result && CrudOperations.isEqual(CrudOperations.DELETE, result.operation)) {
          this.deletePlayer(result.player);
        }
      });
  }

  deletePlayer(player: Player) {
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
        this.playerService.delete(player.id).subscribe(
          (players: Player[]) => {
            if (!players) {
              this.dialogService.errorMessage('Ocorreu um erro durante essa operação, tente novamente mais tarde.');
            }
          }
        );
      }
    });
  }
}
