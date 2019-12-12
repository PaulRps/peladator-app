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
import { PlayersListComponent } from './players/players-list/players-list.component';
import { PlayerFormComponent } from './players/player-form/player-form.component';
import { HeaderComponent } from './menu/header/header.component';
import {MatchPlayersComponent} from './matches/match-players/match-players.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayersListComponent,
    PlayerFormComponent,
    HeaderComponent,
    MatchPlayersComponent
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
  entryComponents : [PlayerFormComponent]
})
export class AppModule { }
