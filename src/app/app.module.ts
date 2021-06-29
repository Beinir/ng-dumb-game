import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BombComponent } from './bomb/bomb.component';
import { MessageNotificationsComponent } from './messageNotifications/messageNotifications.component';
import { HttpClientModule } from '@angular/common/http';
import { GameWonStateComponent } from './bomb/game-won-state/game-won-state.component';

@NgModule({
  declarations: [
    AppComponent,
    BombComponent,
    MessageNotificationsComponent,
    GameWonStateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
