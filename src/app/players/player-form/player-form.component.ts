import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
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

  private activeIconClass = 'mat-icon material-icons level-icon-active';
  playerForm: FormGroup;
  playerLevels: any[];
  playerPositions: any[];
  starIconClasses: string[] = ["mat-icon notranslate material-icons mat-icon-no-color",
                              "mat-icon notranslate material-icons mat-icon-no-color",
                              "mat-icon notranslate material-icons mat-icon-no-color",
                              "mat-icon notranslate material-icons mat-icon-no-color",
                              "mat-icon notranslate material-icons mat-icon-no-color"];
  @Input() player: Player;
  @Output() newPlayerEvent: EventEmitter<any> = new EventEmitter();
  

  constructor(public activeModal: NgbActiveModal,
              private playersService: PlayersService) { }

  ngOnInit() {
    this.playerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      age: new FormControl(null, [Validators.required]),
      shirtNumber: new FormControl(null, [Validators.required]),
      position: new FormControl(null, [Validators.required])
    });

    this.playersService.getFormData()
    .subscribe(formData => {
      this.playerLevels = formData.skillLevels;
      this.playerPositions = formData.positions;
      if (this.player) {
        this.playerForm.setValue(
          {
            name: this.player.name,
            age: this.player.age,
            shirtNumber: this.player.shirtNumber,
            position: this.player.position
          }
        );
        for (let i = 0; i < this.player.skillLevel.id; i++) {
          this.starIconClasses[i] = this.activeIconClass;
        }
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
            .setShirtNumber(this.playerForm.value.shirtNumber)
            .setPosition(this.playerForm.value.position);
    
    for (let i = this.starIconClasses.length; i >= 0; i--) {
      if (this.starIconClasses[i] === this.activeIconClass) {
        temp.skillLevel = this.playerLevels.filter((el) => el.id === i + 1)[0];
        break;
      }
    }
    this.playerForm.reset();
    this.newPlayerEvent.emit({
      player: temp,
      operation: isDeletion ? CrudOperations.DELETE : this.player ? CrudOperations.UPDATE : CrudOperations.CREATE
    });
  }

  activeStar(starIcon, index) {
    let newClass = "mat-icon notranslate material-icons mat-icon-no-color";
    if (starIcon && starIcon['_elementRef']['nativeElement']['className'] === "mat-icon notranslate material-icons mat-icon-no-color") {
      newClass = this.activeIconClass;
    }

    if (index < this.starIconClasses.length && this.starIconClasses[index] === this.activeIconClass) {
      for (let i = index; i < this.starIconClasses.length; i++) {
        this.starIconClasses[i] = "mat-icon notranslate material-icons mat-icon-no-color";
      }
      return;
    }

    for (let i = index - 1; i >= 0; i--) {
      this.starIconClasses[i] = newClass;
    }
  }

  compareItemSelect(a, b) {
    return a && b && a.id === b.id;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

}
