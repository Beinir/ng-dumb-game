import { Component, OnInit } from '@angular/core';
import {observable, Observable, Subscription, timer, interval} from 'rxjs';

@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.css']
})
export class BombComponent implements OnInit {

  timer:any[];
  stoptimer:boolean[];
  disablebutton:boolean[];
  game_over: boolean;
  disablebtn: boolean;
  pressstar: boolean;
  game_won: number;
  time_score: number;
  high_score: number;
  countdown: number;
  subscription: Subscription;

  constructor() {
  }

  public timeGenerator(){
    this.game_over = false
    this.disablebutton = [false,false,false,false ]
    this.assignTimer()
    this.subscription = interval(100).subscribe(this.countDown.bind(this));
    this.disablebtn = true;

  }

  public assignTimer(){
    for(let i = 0; i < 4; i++){
      this.timer[i] = (Math.random() * (2.5 - 4.1) + 4.1).toFixed(1)
    }

  }

  countDown() {
    this.gameOver()
    this.gameWin()
    if (this.timer[0] > 0.0 && this.stoptimer[0] == false ) {
      this.timer[0] = this.timer[0] -0.1;
      this.timer[0] = Math.round((this.timer[0] + Number.EPSILON) * 100) / 100
    }
    if (this.timer[1] > 0.0 && this.stoptimer[1] == false) {
      this.timer[1] = this.timer[1] -0.1;
      this.timer[1] = Math.round((this.timer[1] + Number.EPSILON) * 100) / 100
    }
    if (this.timer[2] > 0.0  && this.stoptimer[2] == false) {
      this.timer[2] = this.timer[2] -0.1;
      this.timer[2] = Math.round((this.timer[2] + Number.EPSILON) * 100) / 100
    }
    if (this.timer[3] > 0.0 && this.stoptimer[3] == false) {
      this.timer[3] = this.timer[3] -0.1;
      this.timer[3] = Math.round((this.timer[3] + Number.EPSILON) * 100) / 100
    }
    else { return }
  }

  public stop(para) {
      this.stoptimer[para] = true;
      this.game_won = this.game_won + 1;
      this.disablebutton[para] = true;
  }


  public gameWin() {
    if (this.game_won == 4) {
      this.time_score = this.timer[0] + this.timer[1] + this.timer[2] + this.timer[3];
      this.time_score = Math.round((this.time_score + Number.EPSILON) * 100) / 100
      this.subscription.unsubscribe()
    }
  }

  public gameOver() {
    if (this.timer[0] < 0.2 || this.timer[1] < 0.2 || this.timer[2] < 0.2 || this.timer[3] < 0.2 ) {
      this.game_over = true;
      this.subscription.unsubscribe();
    }
  }

  public initialGame () {
    this.highScore()
    this.stoptimer = [false,false,false,false];
    this.disablebutton = [true,true,true,true]
    this.timer = [0,0,0,0];
    this.pressstar = false;
    this.game_over = false;
    this.disablebtn = false;
    this.game_won = 0;
  }

  public highScore() {
    if (this.time_score < this.high_score){
      this.high_score = this.time_score;
    }
  }

  public pendingStart(){
    this.pressstar = true;
    this.subscription = interval(1000).subscribe(this.treeTwoOne.bind(this));
    this.treeTwoOne()
  }

  treeTwoOne(){
    if (this.countdown == 1){
      this.subscription.unsubscribe()
      this.pressstar = false;
      this.countdown = 4
      this.timeGenerator()
    }
    else {
      this.countdown = this.countdown -1;
    }



  }

  ngOnInit(): void {
    this.initialGame()
    this.high_score = 1000;
    this.countdown = 4;
  }
}