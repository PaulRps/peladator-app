import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PlayerModule } from './modules/player/player.module';
import { CoreModule } from './core/core.module';
import { TeamModule } from './modules/team/team.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    CoreModule,
    SharedModule,
    PlayerModule,
    TeamModule,
    
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : []
})
export class AppModule { }
