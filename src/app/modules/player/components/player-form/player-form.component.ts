import { CrudOperations } from 'src/app/shared/constants/crud-operation';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PlayerService } from '../../player.service';
import { Player } from '../../../../shared/models/player.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {

  private activeIconClass = 'mat-icon material-icons level-icon-active';
  hasErrorSkillLevelField = false;
  playerForm: FormGroup;
  playerLevels: any[];
  playerPositions: any[];
  starIconClasses: string[] = ['mat-icon notranslate material-icons mat-icon-no-color',
                              'mat-icon notranslate material-icons mat-icon-no-color',
                              'mat-icon notranslate material-icons mat-icon-no-color',
                              'mat-icon notranslate material-icons mat-icon-no-color',
                              'mat-icon notranslate material-icons mat-icon-no-color'];
  @Input() player: Player;
  @Output() newPlayerEvent: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal,
              private dialogService: DialogService,
              private playerService: PlayerService) { }

  ngOnInit() {
    this.playerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      age: new FormControl(null, [Validators.required]),
      shirtNumber: new FormControl(null, [Validators.required]),
      position: new FormControl(null, [Validators.required])
    });

    this.playerService.getFormData()
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
      this.formMarkAllasTouched();
      return;
    }

    if (this.starIconClasses.filter((el => el === this.activeIconClass)).length === 0) {
      this.hasErrorSkillLevelField = true;
      return;
    }

    const temp = isDeletion ?
        this.player :
        new Player()
            .setId(this.player ? this.player.id : null)
            .setName(this.playerForm.value.name)
            .setAge(this.playerForm.value.age)
            .setShirtNumber(this.playerForm.value.shirtNumber)
            .setPosition(this.playerForm.value.position);

    this.setSkillLevel(temp);

    if (isDeletion) {// delete
      this.newPlayerEvent.emit({
        operation: CrudOperations.DELETE,
        player: temp
      });
    } else if (this.player) {// update
      this.newPlayerEvent.emit({
        operation: CrudOperations.UPDATE,
        player: temp
      });
    } else {// create
      this.newPlayerEvent.emit(temp);
    }

    this.playerForm.reset();
    this.activeModal.close();
  }

  formMarkAllasTouched() {
    for (const field in this.playerForm.controls) {
      this.playerForm.controls[field].markAsTouched();
    }
  }

  setSkillLevel(player) {
    for (let i = this.starIconClasses.length; i >= 0; i--) {
      if (this.starIconClasses[i] === this.activeIconClass) {
        player.skillLevel = this.playerLevels.filter((el) => el.id === i + 1)[0];
        break;
      }
    }
  }

  activeStar(starIcon, index) {
    this.hasErrorSkillLevelField = false;
    let newClass = 'mat-icon notranslate material-icons mat-icon-no-color';
    if (starIcon && starIcon._elementRef.nativeElement.className === 'mat-icon notranslate material-icons mat-icon-no-color') {
      newClass = this.activeIconClass;
    }

    if (index < this.starIconClasses.length && this.starIconClasses[index] === this.activeIconClass) {
      for (let i = index; i < this.starIconClasses.length; i++) {
        this.starIconClasses[i] = 'mat-icon notranslate material-icons mat-icon-no-color';
      }
      return;
    }

    for (let i = index - 1; i >= 0; i--) {
      this.starIconClasses[i] = newClass;
    }
  }

  compareItemSelect(a, b) {
    // return a && b && a.id === b.id;
    return a && b ? a.id === b.id : a === b;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

}
