import { RouterModule } from '@angular/router';
import { TeamMenuItemComponent } from './components/team-menu-item/team-menu-item.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamSortComponent } from './components/team-sort/team-sort.component';
import { TeamComponent } from './page/team/team.component';

@NgModule({
    declarations: [
        TeamSortComponent,
        TeamComponent,
        TeamMenuItemComponent
    ],
    imports: [
        RouterModule,
        SharedModule
    ],
    exports: [
        TeamSortComponent,
        TeamComponent,
        TeamMenuItemComponent
    ],
    providers: [],
    entryComponents : []
})
export class TeamModule {}