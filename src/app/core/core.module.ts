import { AlertConfirmComponent } from './components/alert/alert-confirm/alert-confirm.component';
import { AlertInfoComponent } from './components/alert/alert-info/alert-info.component';
import { AlertWarnComponent } from './components/alert/alert-warn/alert-warn.component';
import { AlertSuccessComponent } from './components/alert/alert-success/alert-success.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { SharedModule } from '../shared/shared.module';
import { TeamsModule } from '../modules/teams/teams.module';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { AlertErrorComponent } from './components/alert/alert-error/alert-error.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavListComponent,
    ThemePickerComponent,
    AlertSuccessComponent,
    AlertErrorComponent,
    AlertWarnComponent,
    AlertInfoComponent,
    AlertConfirmComponent
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
  entryComponents: [
    AlertSuccessComponent,
    AlertErrorComponent,
    AlertWarnComponent,
    AlertInfoComponent,
    AlertConfirmComponent
  ]
})
export class CoreModule { }
