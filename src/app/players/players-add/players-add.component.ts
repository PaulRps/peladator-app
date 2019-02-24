import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { PlayersService } from '../players.service'
import { Player } from '../player';
import { PlayerPosition } from '../player.position';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

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
  
  
  constructor(private modalService: NgbModal, 
              private playersService: PlayersService) { }

  ngOnInit() {

    // this.getPlayerPositions();
    this.playerPositions = []; 
    this.playerPositions.push(new PlayerPosition(1, 'goleiro'));   
    this.playerPositions.push(new PlayerPosition(2, 'zagueiro'));   
    this.addedPlayer = new Player(null, null, null, null, null);    
  }  

  addPlayer(player: Player){
    
    if (!player) { return; }

    this.playersService.addPlayer(player)
      .subscribe(player => {
        this.players.push(player);

    });
    
  }

  getPlayerPositions(): void {
    this.playersService.getPlayerPositions()
    .subscribe(playerPositions => this.playerPositions = playerPositions);
    
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(content);    
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
