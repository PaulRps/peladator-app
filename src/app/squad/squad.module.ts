import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { PlayerRepository } from './data/repositories/player.repository';
import { IPlayerRepository } from './domain/repositories/player.repository';
import { AddPlayerComponent } from './presentation/pages/add-player/add-player.component';
import { ListPlayersComponent } from './presentation/pages/list-players/list-players.component';
import { SquadRoutingModule } from './squad-routing.module';
import { CreateFixtureComponent } from './presentation/pages/create-fixture/create-fixture.component';
import { IFixtureRepository } from './domain/repositories/fixture.repository';
import { FixtureRepository } from './data/repositories/fixture.repository';
import { LatestCreatedFixtureComponent } from './presentation/pages/latest-created-fixture/latest-created-fixture.component';

@NgModule({
  providers: [
    {
      provide: IPlayerRepository.name,
      useClass: PlayerRepository,
    },
    {
      provide: IFixtureRepository.name,
      useClass: FixtureRepository,
    },
  ],
  declarations: [ListPlayersComponent, AddPlayerComponent, CreateFixtureComponent, LatestCreatedFixtureComponent],
  imports: [CommonModule, ReactiveFormsModule, CoreModule, SquadRoutingModule],
})
export class SquadModule {}

