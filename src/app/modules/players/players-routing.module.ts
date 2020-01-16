import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './page/players.component';

const routes: Routes = [
    { path: '', component: PlayersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes/* , {useHash: true, enableTracing: true} */)],
    exports: [RouterModule]
})
export class PlayersRoutingModule {}