import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  { path: 'player', component: PlayersComponent},
  { path: '', redirectTo: '/player', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
