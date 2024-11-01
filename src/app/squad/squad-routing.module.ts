import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPlayersComponent } from './presentation/pages/list-players/list-players.component';
import { AddPlayerComponent } from './presentation/pages/add-player/add-player.component';
import { CreateFixtureComponent } from './presentation/pages/create-fixture/create-fixture.component';
import { LatestCreatedFixtureComponent } from './presentation/pages/latest-created-fixture/latest-created-fixture.component';

const routes: Routes = [
  {
    path: '',
    component: ListPlayersComponent,
  },
  {
    path: 'add',
    component: AddPlayerComponent,
  },
  {
    path: 'create-fixture',
    component: CreateFixtureComponent,
  },
  {
    path: 'latest-fixture',
    component: LatestCreatedFixtureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SquadRoutingModule {}

