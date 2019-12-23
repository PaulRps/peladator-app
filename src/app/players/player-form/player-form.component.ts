import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { PlayersService } from '../players.service';
import { Player } from '../player.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CrudOperations } from 'src/app/shared/crud-operation.constants';



@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class ModalPlayerFormComponent implements OnInit {

  playerForm: FormGroup;
  playerLevels: any[];

  @Input() player: Player;
  @Output() newPlayerEvent: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal,
              private playersService: PlayersService) { }

  ngOnInit() {
    this.playerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      age: new FormControl(null, [Validators.required]),
      skillLevel: new FormControl(null, [Validators.required])
    });

    this.playersService.getFormData()
    .subscribe(formData => {
      this.playerLevels = formData.skillLevels;
      if (this.player) {
        this.playerForm.setValue(
          {
            name: this.player.name,
            age: this.player.age,
            skillLevel: this.player.skillLevel
          }
        );
      }
    });
  }

  submit(isDeletion) {
    if (this.playerForm.invalid) {
      return;
    }
    this.activeModal.close();
    
    const temp = isDeletion ?
        this.player :
        new Player()
            .setId(this.player ? this.player.id : null)
            .setName(this.playerForm.value.name)
            .setAge(this.playerForm.value.age)
            .setSkillLevel(this.playerForm.value.skillLevel);

    this.playerForm.reset();
    this.newPlayerEvent.emit({
      player: temp,
      operation: isDeletion ? CrudOperations.DELETE : CrudOperations.CREATE
    });
  }

  compareSkillLevel(a, b) {
    return a && b && a.id === b.id;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

}
