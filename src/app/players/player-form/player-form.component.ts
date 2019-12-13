import { Component, OnInit, Input, Output } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { PlayersService } from '../players.service'
import { Player } from '../player';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/dialogService';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  
  playerForm: FormGroup;
  playerLevels: any[];

  @Input() player: any;
  @Output() newPlayerEvent: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal,
              private dialogService: DialogService,
              public activeModal: NgbActiveModal,
              private playersService: PlayersService) { }

  ngOnInit() {
    this.playerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      age: new FormControl(null,[Validators.required]),
      skillLevel: new FormControl('', [Validators.required])
    });
    // this.getPlayerPositions();
    if (this.player){
      this.playerForm.value['name'] = this.player.name;
      this.playerForm.value['age'] = this.player.age;
      this.playerForm.value['skillLevel'] = this.player.skillLevel;
    } else {
      this.playersService.getFormData()
      .subscribe(playerAddData => {
        // this.playerPositions = playerAddData.positions;
        this.playerLevels = playerAddData.skillLevels;
      });
    }
    console.log(this.player);
  }

  submit() {
    if (this.playerForm.invalid) {
      return;
    }
    // this.modalService.dismissAll();
    // const newPlayer = new Player(null, this.playerForm.value['name'], this.playerForm.value['age'], this.playerForm.value['skillLevel']);
    // this.playersService.save(newPlayer)
    //   .subscribe((players: Player[]) => {
    //     this.dialogService.successMessage("Jogador Adicionado!");
    //     this.playerForm.reset();
    // });
    this.activeModal.close();
    this.playerForm.reset();
    this.newPlayerEvent.emit(
      new Player()
          .setName(this.playerForm.value['name']) 
          .setAge(this.playerForm.value['age'])
          .setSkillLevel(this.playerForm.value['skillLevel'])            
    );
  }

  // getPlayerPositions(): void {
  //   this.playersService.getFormData()
  //   .subscribe(playerAddData => {
  //     this.playerPositions = playerAddData.positions;
  //     this.playerLevels = playerAddData.skillLevels;
  //   });
  // }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  public hasError = (controlName: string, errorName: string) =>{
    return this.playerForm.controls[controlName].hasError(errorName);
  }

}
