import { Component, OnInit, Input } from '@angular/core';
import { BombComponent } from '../bomb.component';



@Component({
  selector: 'app-game-won-state',
  templateUrl: './game-won-state.component.html',
  styleUrls: ['./game-won-state.component.css']
})
export class GameWonStateComponent implements OnInit {

  @Input() HighScore: number;
  @Input() timer: any[];
  @Input() TimeScore: number;

  constructor(private bombComponent: BombComponent) { }

  public callInitialGameInBombComponent() {
    this.bombComponent.initializeGame();
  }

  ngOnInit(): void {
  }
}
