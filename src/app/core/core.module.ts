import { AlertConfirmComponent } from './components/alert/alert-confirm/alert-confirm.component';
import { AlertInfoComponent } from './components/alert/alert-info/alert-info.component';
import { AlertWarnComponent } from './components/alert/alert-warn/alert-warn.component';
import { AlertSuccessComponent } from './components/alert/alert-success/alert-success.component';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { SharedModule } from '../shared/shared.module';
import { TeamsModule } from '../modules/teams/teams.module';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { AlertErrorComponent } from './components/alert/alert-error/alert-error.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoginComponent } from './components/login/login.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavListComponent,
    ThemePickerComponent,
    AlertSuccessComponent,
    AlertErrorComponent,
    AlertWarnComponent,
    AlertInfoComponent,
    AlertConfirmComponent,
    LoginComponent,
  ],
  imports: [CoreRoutingModule, SharedModule, TeamsModule],
  exports: [HeaderComponent, SidenavListComponent, ThemePickerComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class CoreModule {}
