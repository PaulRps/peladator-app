import { DialogService } from 'src/app/core/services/dialog.service';
import { CrudOperations } from 'src/app/shared/constants/crud-operation';
import { Component, OnInit, Input } from '@angular/core';

import { PlayersService } from '../../players.service';
import { Player } from '../../../../shared/models/player.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Optional } from '@angular/core';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss'],
})
export class PlayerFormComponent implements OnInit {
  private activeIconClass = 'mat-icon material-icons level-icon-active';
  hasErrorSkillLevelField = false;
  playerForm: FormGroup;
  playerLevels: any[];
  playerPositions: any[];
  starIconClasses: string[] = [
    'mat-icon notranslate material-icons mat-icon-no-color',
    'mat-icon notranslate material-icons mat-icon-no-color',
    'mat-icon notranslate material-icons mat-icon-no-color',
    'mat-icon notranslate material-icons mat-icon-no-color',
    'mat-icon notranslate material-icons mat-icon-no-color',
  ];
  @Input() player: Player;

  constructor(
    public dialogRef: MatDialogRef<PlayerFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogService: DialogService,
    private playerService: PlayersService
  ) {}

  ngOnInit() {
    this.playerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      age: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(99)]),
      shirtNumber: new FormControl(null, [Validators.required, Validators.min(1), , Validators.max(99)]),
      position: new FormControl(null, [Validators.required]),
    });

    this.playerService.getFormData().subscribe(formData => {
      this.playerLevels = formData.skillLevels;
      this.playerPositions = formData.positions;
      if (this.data) {
        this.playerForm.setValue({
          name: this.data.name,
          age: this.data.age,
          shirtNumber: this.data.shirtNumber,
          position: this.data.position,
        });
        for (let i = 0; i < this.data.skillLevel.id; i++) {
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

    if (this.starIconClasses.filter(el => el === this.activeIconClass).length === 0) {
      this.hasErrorSkillLevelField = true;
      return;
    }

    const temp = isDeletion
      ? this.data
      : new Player()
          .setId(this.data ? this.data.id : null)
          .setName(this.playerForm.value.name)
          .setAge(this.playerForm.value.age)
          .setShirtNumber(this.playerForm.value.shirtNumber)
          .setPosition(this.playerForm.value.position);

    this.setSkillLevel(temp);

    this.playerForm.reset();

    if (isDeletion) {
      // delete
      this.dialogRef.close({
        operation: CrudOperations.DELETE,
        player: temp,
      });
    } else if (this.data) {
      // update
      this.dialogRef.close({
        operation: CrudOperations.UPDATE,
        player: temp,
      });
    } else {
      // create
      this.dialogRef.close(temp);
    }
  }

  close() {
    this.dialogRef.close();
  }

  formMarkAllasTouched() {
    for (const field in this.playerForm.controls) {
      this.playerForm.controls[field].markAsTouched();
    }
  }

  setSkillLevel(player) {
    for (let i = this.starIconClasses.length; i >= 0; i--) {
      if (this.starIconClasses[i] === this.activeIconClass) {
        player.skillLevel = this.playerLevels.filter(el => el.id === i + 1)[0];
        break;
      }
    }
  }

  activeStar(starIcon, index) {
    this.hasErrorSkillLevelField = false;
    let newClass = 'mat-icon notranslate material-icons mat-icon-no-color';
    if (
      starIcon &&
      starIcon._elementRef.nativeElement.className === 'mat-icon notranslate material-icons mat-icon-no-color'
    ) {
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
    return a && b ? a.id === b.id : a === b;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  };
}
