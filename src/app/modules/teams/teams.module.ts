import { TeamsMenuItemComponent } from './components/teams-menu-item/teams-menu-item.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamsSortedComponent } from './components/teams-sorted/teams-sorted.component';
import { TeamsComponent } from './page/teams.component';
import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
    declarations: [
        TeamsSortedComponent,
        TeamsComponent,
        TeamsMenuItemComponent
    ],
    imports: [
        TeamsRoutingModule,
        SharedModule
    ],
    exports: [
        TeamsSortedComponent,
        TeamsComponent,
        TeamsMenuItemComponent
    ],
    providers: [],
    entryComponents : []
})
export class TeamsModule {}