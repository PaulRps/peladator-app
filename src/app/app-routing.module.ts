import { TeamComponent } from './modules/team/page/team/team.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './modules/player/page/players.component';
import { TeamSortComponent } from './modules/team/components/team-sort/team-sort.component';

const routes: Routes = [
  { path: 'player', component: PlayersComponent},
  { path: 'teams', component: TeamComponent},
  { path: 'teams/sorted', component: TeamSortComponent},
  { path: '', redirectTo: '/player', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
