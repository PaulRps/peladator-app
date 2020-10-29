import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'players', loadChildren: () => import('./modules/players/players.module').then(m => m.PlayersModule) },
  { path: 'teams', loadChildren: () => import('./modules/teams/teams.module').then(m => m.TeamsModule) },
  { path: 'login', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
  { path: 'payments', loadChildren: () => import('./modules/payments/payments.module').then(m => m.PaymentsModule) },
  { path: '', redirectTo: '/players', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes /* , {useHash: true, enableTracing: true} */)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
