import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [PlayerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, MaterialModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, NgbModule, PlayerComponent],
})
export class SharedModule {}
