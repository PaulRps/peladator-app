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
  hasErrorSkillLevelField = false;
  playerForm: FormGroup;
  playerLevels: any[];
  playerPositions: any[];
  activesStarIcon: boolean[] = [false, false, false, false, false];
  @Input() player: Player;

  constructor(
    public dialogRef: MatDialogRef<PlayerFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private playerService: PlayersService
  ) {
    this.playerForm = new FormGroup({
      name: new FormControl(this.data?.name, [Validators.required, Validators.maxLength(30)]),
      age: new FormControl(this.data?.age, [Validators.required, Validators.min(1), Validators.max(99)]),
      shirtNumber: new FormControl(this.data?.shirtNumber, [
        Validators.required,
        Validators.min(1),
        Validators.max(99),
      ]),
      position: new FormControl(this.data?.position, [Validators.required]),
    });
    for (let i = 0; i < this.data?.skillLevel.id; i++) {
      this.activesStarIcon[i] = true;
    }
  }

  ngOnInit() {
    this.playerService.getFormData().subscribe(formData => {
      this.playerLevels = formData.skillLevels;
      this.playerPositions = formData.positions;
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

    if (this.activesStarIcon.filter(el => el === true).length === 0) {
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
    for (let i = this.activesStarIcon.length; i >= 0; i--) {
      if (this.activesStarIcon[i]) {
        player.skillLevel = this.playerLevels.filter(el => el.id === i + 1)[0];
        break;
      }
    }
  }

  activeStar(index) {
    this.hasErrorSkillLevelField = false;
    let newState = !this.activesStarIcon[index];

    if (this.activesStarIcon[index]) {
      for (let i = index; i < this.activesStarIcon.length; i++) {
        this.activesStarIcon[i] = false;
      }
      return;
    }

    for (let i = index; i >= 0; i--) {
      this.activesStarIcon[i] = newState;
    }
  }

  compareItemSelect(a, b) {
    return a && b ? a.id === b.id : a === b;
  }
}
