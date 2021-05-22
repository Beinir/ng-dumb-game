import { Component, OnInit } from '@angular/core';
import {observable, Observable, Subscription, timer, interval} from 'rxjs';
import { HeroService } from "../services/hero.service";
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
  thisMessage:boolean ;
  ShowGameWin: boolean;
  subscription: Subscription;
  PendingSubscription: Subscription;
  WelcomeSubscription: Subscription;

  constructor(private data: HeroService ) {
  }

  public pendingStart(){
    this.CountDown = 3;
    this.PressStart = true;
    this.StopAudio = false;
    this.PendingSubscription = interval(1000).subscribe(this.treeTwoOne.bind(this));
  }

  public stop(para) {
    this.gameOver();
    this.StopTimer[para] = true;
    this.GameWon = this.GameWon + 1;
    this.DisableButton[para] = true;
  }

  private timeGenerator(){
    this.GameOver = false;
    this.DisableButton = [false, false, false, false];
    this.assignTimerToEachBomb();
    this.subscription = interval(100).subscribe(this.bombsCountDown.bind(this));
    this.DisableBtn = true;
  }

  private assignTimerToEachBomb(){
    for (let i = 0; i < 4; i++){
      this.timer[i] = (Math.random() * (2.0 - 4.1) + 4.1).toFixed(1);
    }

  }


  private bombsCountDown() {
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

  private checkGameStatus(){
    this.gameWin();
    this.gameOver();
  }


  private gameWin() {
    if (this.GameWon === 4 && this.timer[0] !== 0 && this.timer[1] !== 0 && this.timer[2] !== 0 && this.timer[3] !== 0) {
      this.TimeScore = this.timer[0] + this.timer[1] + this.timer[2] + this.timer[3];
      this.TimeScore = Math.round((this.TimeScore + Number.EPSILON) * 100) / 100;
      this.ShowGameWin = true;
      this.subscription.unsubscribe();
    }
  }

  private gameOver() {
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

  private setHighScore() {
    if (this.TimeScore < this.HighScore){
      this.HighScore = this.TimeScore;
    }
  }

  private treeTwoOne() {
    if (this.CountDown > 1) {
      this.CountDown--;
    }
    else if (this.CountDown === 1) {
      this.PressStart = false;
      this.timeGenerator();
      this.PendingSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.data.CurrentMessage.subscribe(message => this.thisMessage = message)
    this.initializeGame();
    this.CountDown = 4;
    this.HighScore = 1000;
    this.InfoBool = false;
  }

}
