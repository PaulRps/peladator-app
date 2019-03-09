import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { PlayersService } from '../players.service'
import { Player } from '../player';
import { PlayerPosition } from '../player.position';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/dialogService';



@Component({
  selector: 'app-players-add',
  templateUrl: './players-add.component.html',
  styleUrls: ['./players-add.component.scss']
})
export class PlayersAddComponent implements OnInit {

  closeResult: string;
  players: Player[];
  playerPositions: PlayerPosition[];
  playerLevels: any[];
  playerForm: FormGroup;
  
  constructor(private modalService: NgbModal,
              private dialogService: DialogService,
              private playersService: PlayersService) { }

  ngOnInit() {

    this.playerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      age: new FormControl(null,[Validators.required]),
      skillLevel: new FormControl('', [Validators.required])
    });

    this.getPlayerPositions();
  }  

  addPlayer(){
    
    if (this.playerForm.invalid){
      return;
    }
    
    this.modalService.dismissAll();
    
    var addedPlayer = new Player(null, this.playerForm.value['name'], this.playerForm.value['age'], this.playerForm.value['skillLevel']);
    
    this.playersService.addPlayer(addedPlayer)
      .subscribe((players:Player[]) => {        
        this.playersService.onPlayerAdded.emit(players);
        this.dialogService.successMessage("Jogador Adicionado!");
        this.playerForm.reset();
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

  public hasError = (controlName: string, errorName: string) =>{
    return this.playerForm.controls[controlName].hasError(errorName);
  }

}
