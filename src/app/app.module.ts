import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { ModalPlayerFormComponent } from './players/player-form/player-form.component';
import { HeaderComponent } from './menu/header/header.component';
import { TeamsComponent } from './modules/teams/teams.component';
import { PlayerComponent } from './players/player/player.component';
import { SidenavListComponent } from './menu/sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    ModalPlayerFormComponent,
    HeaderComponent,
    TeamsComponent,
    PlayerComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [
    ModalPlayerFormComponent,
    TeamsComponent
  ]
})
export class AppModule { }
