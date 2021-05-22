import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { interval, Subscription} from 'rxjs';
import { HeroService } from "../services/hero.service";

@Component({
  selector: 'app-message-notifications-component',
  templateUrl: './messageNotifications.html',
  styleUrls: ['./messageNotifications.css']
})
export class MessageNotificationsComponent implements OnInit {

  counter: number;
  showThisScene: boolean
  Subscription: Subscription;

  constructor(private data: HeroService) { }

  public CountDownFunction(){
    if (this.counter < 3) {
      this.counter = this.counter + 1;
    }
    else {
      this.updateMessage();
      this.Subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.data.CurrentMessage.subscribe(message => this.showThisScene = message)
    this.counter = 0;
    this.Subscription = interval(1000).subscribe(this.CountDownFunction.bind(this));
  }

  updateMessage() {
    this.data.changeMessage(false);
  }

}
