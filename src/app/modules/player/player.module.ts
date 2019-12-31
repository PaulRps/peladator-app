import { PlayerCrudComponent } from './components/player-crud/player-crud.component';
import { SharedModule } from './../../shared/shared.module';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { NgModule } from '@angular/core';
import { PlayerComponent } from './components/player/player.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { PlayersComponent } from './page/players.component';
import { CoreModule } from 'src/app/core/core.module';
import { SortTeamsComponent } from './components/sort-teams/sort-teams.component';

@NgModule({
    declarations: [
        PlayerFormComponent,
        PlayerComponent,
        PlayerTableComponent,
        PlayersComponent,
        PlayerCrudComponent,
        SortTeamsComponent
    ],
    imports: [
        CoreModule,
        SharedModule
    ],
    exports: [],
    entryComponents : [
        PlayerFormComponent,
        SortTeamsComponent
    ]
})
export class PlayerModule {}
