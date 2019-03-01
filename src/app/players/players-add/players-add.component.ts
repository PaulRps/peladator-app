import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { PlayersService } from '../players.service'
import { Player } from '../player';
import { PlayerPosition } from '../player.position';


@Component({
  selector: 'app-players-add',
  templateUrl: './players-add.component.html',
  styleUrls: ['./players-add.component.scss']
})
export class PlayersAddComponent implements OnInit {

  closeResult: string;
  players: Player[];
  playerPositions: PlayerPosition[];
  addedPlayer: Player;
  playerLevels: any[];
  
  constructor(private modalService: NgbModal, 
              private playersService: PlayersService) { }

  ngOnInit() {

    this.getPlayerPositions();
    this.addedPlayer = new Player(null, null, null, null, null);    
  }  

  addPlayer(){
    
    this.modalService.dismissAll();

    this.playersService.addPlayer(this.addedPlayer)
      .subscribe((players:Player[]) => {
        this.playersService.onPlayerAdded.emit(players);
        this.addedPlayer = new Player(null, null, null, null, null);
    });
    
  }

  getPlayerPositions(): void {
    this.playersService.getPlayerAddData()
    .subscribe(playerAddData => {
      this.playerPositions = playerAddData.positions;
      this.playerLevels = playerAddData.skillLevels;
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
