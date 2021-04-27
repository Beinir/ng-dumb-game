import { Component, OnInit } from '@angular/core';
import {observable, Observable, Subscription, timer, interval} from 'rxjs';
import {publish} from 'rxjs/operators';

@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.css']
})
export class BombComponent implements OnInit {

  timer: any[];
  StopTimer: boolean[];
  DisableButton: boolean[];
  GameOver: boolean;
  DisableBtn: boolean;
  PressStart: boolean;
  InfoBool: boolean;
  StopAudio: boolean;
  GameWon: number;
  TimeScore: number;
  HighScore: number;
  CountDown: number;
  welcome: number;
  ShowGameWin: boolean;
  subscription: Subscription;
  PendingSubscription: Subscription;
  WelcomeSubscription: Subscription;

  constructor() {
  }

  public timeGenerator(){
    this.GameOver = false;
    this.DisableButton = [false, false, false, false];
    this.assignTimerToEachBomb();
    this.subscription = interval(100).subscribe(this.bombsCountDown.bind(this));
    this.DisableBtn = true;
  }

  public assignTimerToEachBomb(){
    for (let i = 0; i < 4; i++){
      this.timer[i] = (Math.random() * (2.0 - 4.1) + 4.1).toFixed(1);
    }

  }


  public bombsCountDown() {
    this.checkGameStatus();
    if (this.ShowGameWin === false && this.GameOver === false ) {
      if (this.timer[0] > 0.0 && this.StopTimer[0] === false ) {
      this.timer[0] = this.timer[0] - 0.1;
      this.timer[0] = Math.round((this.timer[0] + Number.EPSILON) * 100) / 100;
      }
      if (this.timer[1] > 0.0 && this.StopTimer[1] === false) {
      this.timer[1] = this.timer[1] - 0.1;
      this.timer[1] = Math.round((this.timer[1] + Number.EPSILON) * 100) / 100;
      }
      if (this.timer[2] > 0.0  && this.StopTimer[2] === false) {
      this.timer[2] = this.timer[2] - 0.1;
      this.timer[2] = Math.round((this.timer[2] + Number.EPSILON) * 100) / 100;
      }
      if (this.timer[3] > 0.0 && this.StopTimer[3] === false) {
      this.timer[3] = this.timer[3] - 0.1;
      this.timer[3] = Math.round((this.timer[3] + Number.EPSILON) * 100) / 100;
      }
      else { return; }
    }
    else { return; }
  }

  public checkGameStatus(){
    this.gameWin();
    this.gameOver();
  }

  public stop(para) {
    this.gameOver();
    this.StopTimer[para] = true;
    this.GameWon = this.GameWon + 1;
    this.DisableButton[para] = true;
  }


  public gameWin() {
    if (this.GameWon === 4 && this.timer[0] !== 0 && this.timer[1] !== 0 && this.timer[2] !== 0 && this.timer[3] !== 0) {
      this.TimeScore = this.timer[0] + this.timer[1] + this.timer[2] + this.timer[3];
      this.TimeScore = Math.round((this.TimeScore + Number.EPSILON) * 100) / 100;
      this.ShowGameWin = true;
      this.subscription.unsubscribe();
    }
  }

  public gameOver() {
    if (this.timer[0] === 0.0 || this.timer[1] === 0.0 || this.timer[2] === 0.0 || this.timer[3] === 0.0 ) {
      this.DisableButton = [true, true, true, true];
      this.GameOver = true;
      this.subscription.unsubscribe();
    }
  }

  public initializeGame() {
    this.setHighScore();
    this.ShowGameWin = false;
    this.StopTimer = [false, false, false, false];
    this.DisableButton = [true, true, true, true];
    this.timer = [0, 0, 0, 0];
    this.PressStart = false;
    this.GameOver = false;
    this.DisableBtn = false;
    this.GameWon = 0;
    this.CountDown = 4;
  }

  public setHighScore() {
    if (this.TimeScore < this.HighScore){
      this.HighScore = this.TimeScore;
    }
  }

  public pendingStart(){
    this.CountDown = 3;
    this.PressStart = true;
    this.StopAudio = false;
    this.PendingSubscription = interval(1000).subscribe(this.treeTwoOne.bind(this));
  }

  public treeTwoOne() {
    if (this.CountDown > 1) {
      this.CountDown--;
    }
    else if (this.CountDown === 1) {
      this.PressStart = false;
      this.timeGenerator();
      this.PendingSubscription.unsubscribe();
    }
  }

  public welcomeMessage(){
    if (this.welcome < 4) {
      this.welcome = this.welcome + 1;
    }
    else {
      this.WelcomeSubscription.unsubscribe()
    }
  }


  ngOnInit(): void {
    this.initializeGame();
    this.CountDown = 4;
    this.HighScore = 1000;
    this.welcome = 0;
    this.InfoBool = false;
    this.WelcomeSubscription = interval(1000).subscribe(this.welcomeMessage.bind(this));
  }

}
