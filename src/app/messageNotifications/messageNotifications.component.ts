import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { interval, Subscription} from 'rxjs';
import { HeroService } from "../services/hero.service";

@Component({
  selector: 'app-message-notifications-component',
  templateUrl: './messageNotifications.html',
  styleUrls: ['./messageNotifications.css']
})
export class MessageNotificationsComponent implements OnInit {

  welcome: number;
  WelcomeSubscription: Subscription;

  constructor(private data: HeroService) { }

  public welcomeMessage(){
    if (this.welcome < 4) {
      this.welcome = this.welcome + 1;
    }
    else {
      this.WelcomeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.welcome = 0;
    this.WelcomeSubscription = interval(1000).subscribe(this.welcomeMessage.bind(this));
  }

}
