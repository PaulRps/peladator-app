import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { SharedModule } from '../shared/shared.module';
import { TeamsModule } from '../modules/teams/teams.module';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavListComponent,
    ThemePickerComponent
  ],
  imports: [
    RouterModule,

    SharedModule,
    TeamsModule
  ],
  exports: [
    HeaderComponent,
    SidenavListComponent,
    ThemePickerComponent
  ],
  providers: [],
  entryComponents: []
})
export class CoreModule { }
