import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { SharedModule } from '../shared/shared.module';
import { TeamsModule } from '../modules/teams/teams.module';

@NgModule({
    declarations: [
        HeaderComponent,
        SidenavListComponent
    ],
    imports: [
        RouterModule,

        SharedModule,
        TeamsModule
    ],
    exports: [
        HeaderComponent,
        SidenavListComponent
    ],
    providers: [],
    entryComponents : []
})
export class CoreModule {}