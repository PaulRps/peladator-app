import { RouterModule } from '@angular/router';
import { TeamModule } from './../modules/team/team.module';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        HeaderComponent,
        SidenavListComponent
    ],
    imports: [
        RouterModule,

        SharedModule,
        TeamModule
    ],
    exports: [
        HeaderComponent,
        SidenavListComponent
    ],
    providers: [],
    entryComponents : []
})
export class CoreModule {}