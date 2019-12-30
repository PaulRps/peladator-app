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
        SharedModule
    ],
    exports: [
        HeaderComponent,
        SidenavListComponent
    ],
    providers: [],
    entryComponents : []
})
export class CoreModule {}