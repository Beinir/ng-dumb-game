import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BombComponent } from './bomb/bomb.component';
import { MessageNotificationsComponent } from './messageNotifications/messageNotifications.component';

@NgModule({
  declarations: [
    AppComponent,
    BombComponent,
    MessageNotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
