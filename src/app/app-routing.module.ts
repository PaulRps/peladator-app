import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'player', loadChildren: () => import('./modules/players/players.module').then(m => m.PlayersModule) },
  { path: 'teams', loadChildren: () => import('./modules/teams/teams.module').then(m => m.TeamsModule) },
  { path: '', redirectTo: '/player', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes/* , {useHash: true, enableTracing: true} */)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
