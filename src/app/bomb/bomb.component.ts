import { Component, OnInit } from '@angular/core';
import {observable, Observable, Subscription, timer, interval} from 'rxjs';
import {publish} from "rxjs/operators";

@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.css']
})
export class BombComponent implements OnInit {

  timer:any[];
  stop_timer:boolean[];
  disable_button:boolean[];
  game_over: boolean;
  disable_btn: boolean;
  press_star: boolean;
  info_bool: boolean;
  stop_audio: boolean;
  game_won: number;
  time_score: number;
  high_score: number;
  count_down: number;
  welcome:number;
  show_game_win:boolean;
  subscription: Subscription;
  pending_subscription: Subscription;
  welcome_subscription: Subscription;

  constructor() {
  }

  public timeGenerator(){
    this.game_over = false
    this.disable_button = [false,false,false,false]
    this.assignTimer()
    this.subscription = interval(100).subscribe(this.countDown.bind(this));
    this.disable_btn = true;
    console.log(this.timer[0]);
    console.log(this.timer[1]);
    console.log(this.timer[2]);
    console.log(this.timer[3]);
  }

  public assignTimer(){
    for(let i = 0; i < 4; i++){
      this.timer[i] = (Math.random() * (2.0 - 4.1) + 4.1).toFixed(1)
    }

  }


  countDown() {
    this.checkGameStatus()
    if (this.show_game_win == false && this.game_over == false ) {
      if (this.timer[0] > 0.0 && this.stop_timer[0] == false ) {
      this.timer[0] = this.timer[0] -0.1;
      this.timer[0] = Math.round((this.timer[0] + Number.EPSILON) * 100) / 100
      }
      if (this.timer[1] > 0.0 && this.stop_timer[1] == false) {
      this.timer[1] = this.timer[1] -0.1;
      this.timer[1] = Math.round((this.timer[1] + Number.EPSILON) * 100) / 100
      }
      if (this.timer[2] > 0.0  && this.stop_timer[2] == false) {
      this.timer[2] = this.timer[2] -0.1;
      this.timer[2] = Math.round((this.timer[2] + Number.EPSILON) * 100) / 100
      }
      if (this.timer[3] > 0.0 && this.stop_timer[3] == false) {
      this.timer[3] = this.timer[3] -0.1;
      this.timer[3] = Math.round((this.timer[3] + Number.EPSILON) * 100) / 100
      }
      else { return }
    }
    else { return }
  }

  public checkGameStatus(){
    this.gameWin()
    this.gameOver()
  }

  public stop(para) {
    this.gameOver()
      this.stop_timer[para] = true;
      this.game_won = this.game_won + 1;
      this.disable_button[para] = true;
  }


  public gameWin() {
    if (this.game_won == 4 && this.timer[0] != 0 && this.timer[1] != 0 && this.timer[2] != 0 && this.timer[3] != 0) {
      this.time_score = this.timer[0] + this.timer[1] + this.timer[2] + this.timer[3];
      this.time_score = Math.round((this.time_score + Number.EPSILON) * 100) / 100
      this.show_game_win = true;
      this.subscription.unsubscribe()
    }
  }

  public gameOver() {
    if (this.timer[0] == 0.0 || this.timer[1] == 0.0 || this.timer[2] == 0.0 || this.timer[3] == 0.0 ) {
      this.disable_button = [true,true,true,true];
      this.game_over = true;
      this.subscription.unsubscribe();
    }
  }

  public initialGame () {
    this.highScore()
    this.show_game_win = false;
    this.stop_timer = [false,false,false,false];
    this.disable_button = [true,true,true,true]
    this.timer = [0,0,0,0];
    this.press_star = false;
    this.game_over = false;
    this.disable_btn = false;
    this.game_won = 0;
    this.count_down = 4;
  }

  public highScore() {
    if (this.time_score < this.high_score){
      this.high_score = this.time_score;
    }
  }

  public pendingStart(){
    this.count_down = 3;
    this.press_star = true;
    this.stop_audio = false;
    this.pending_subscription = interval(1000).subscribe(this.treeTwoOne.bind(this));
  }

  public treeTwoOne() {
    if (this.count_down > 1) {
      this.count_down--;
    }
    else if (this.count_down == 1) {
      this.press_star = false;
      this.timeGenerator()
      this.pending_subscription.unsubscribe();
    }
  }

  public welcomeMessage(){
    if (this.welcome < 4) {
      this.welcome = this.welcome + 1;
    }
    else {
      this.welcome_subscription.unsubscribe()
    }
  }


  ngOnInit(): void {
    this.initialGame()
    this.count_down = 4;
    this.high_score = 1000;
    this.welcome = 0;
    this.info_bool = false;
    this.welcome_subscription = interval(1000).subscribe(this.welcomeMessage.bind(this));
  }

}
