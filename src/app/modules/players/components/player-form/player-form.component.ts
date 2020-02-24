import { Component, OnInit, Input } from '@angular/core';
import { PlayersService } from '../../players.service';
import { Player } from '../../../../shared/models/player.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Optional } from '@angular/core';

const activeIconClass = 'mat-icon notranslate ng-tns-c145-10 material-icons level-icon-active';
const inactiveIconClass = 'mat-icon notranslate ng-tns-c145-10 material-icons mat-icon-no-color';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss'],
})
export class PlayerFormComponent implements OnInit {
  hasErrorSkillLevelField = false;
  playerForm: FormGroup;
  playerLevels: any[];
  playerPositions: any[];
  starIconClasses: string[] = [];
  @Input() player: Player;

  constructor(
    public dialogRef: MatDialogRef<PlayerFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private playerService: PlayersService
  ) {
    for (let i = 0; i < 5; i++) {
      this.starIconClasses.push(inactiveIconClass);
    }
  }

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
          this.starIconClasses[i] = activeIconClass;
        }
      }
    });
  }

  get f() {
    return this.playerForm.controls;
  }

  submit(isDeletion: boolean) {
    if (this.playerForm.invalid) {
      this.playerForm.markAllAsTouched();
      return;
    }

    if (this.starIconClasses.filter(el => el === activeIconClass).length === 0) {
      this.hasErrorSkillLevelField = true;
      return;
    }

    const player = Player.Build()
      .sName(this.f.name.value)
      .sAge(this.f.age.value)
      .sShirtNumber(this.f.shirtNumber.value)
      .sPosition(this.f.position.value);

    this.setSkillLevel(player);

    if (isDeletion) {
      this.playerService.delete(this.data.id).subscribe();
    } else if (this.data) {
      this.playerService.update(player.sId(this.data.id)).subscribe();
    } else {
      this.playerService.save(player).subscribe();
    }

    this.playerForm.reset();
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  setSkillLevel(player) {
    for (let i = this.starIconClasses.length; i >= 0; i--) {
      if (this.starIconClasses[i] === activeIconClass) {
        player.skillLevel = this.playerLevels.filter(el => el.id === i + 1)[0];
        break;
      }
    }
  }

  activeStar(starIcon, index) {
    this.hasErrorSkillLevelField = false;
    let newClass = inactiveIconClass;
    if (starIcon?._elementRef.nativeElement.className === inactiveIconClass) {
      newClass = activeIconClass;
    }

    if (index < this.starIconClasses.length && this.starIconClasses[index] === activeIconClass) {
      for (let i = index; i < this.starIconClasses.length; i++) {
        this.starIconClasses[i] = inactiveIconClass;
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
}
