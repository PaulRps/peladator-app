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
  
  constructor(private modalService: NgbModal, 
              private playersService: PlayersService) { }

  ngOnInit() {

    this.getPlayerPositions();
    this.addedPlayer = new Player(null, null, null, null, null);    
  }  

  addPlayer(event){
    
    // if (!event) { return; }

    // console.log(event);
    // let player = new Player(null, null, null, null, null); 

    this.playersService.addPlayer(this.addedPlayer)
      .subscribe((player:Player) => {
        this.addedPlayer = new Player(null, null, null, null, null);
        // this.players.push(player);
        this.playersService.onTaskAdded.emit(player);
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
