import { TeamsModule } from './../teams/teams.module';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { SharedModule } from '../../shared/shared.module';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { NgModule } from '@angular/core';
import { PlayersComponent } from './page/players.component';
import { CoreModule } from 'src/app/core/core.module';
import { PlayersRoutingModule } from './players.routing.module';

@NgModule({
  declarations: [PlayerFormComponent, PlayerListComponent, PlayersComponent],
  imports: [PlayersRoutingModule, CoreModule, SharedModule, TeamsModule],
  exports: [],
})
export class PlayersModule {}
