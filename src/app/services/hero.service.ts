import { Injectable } from '@angular/core';
import  { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private showIntroSceneIfTrue = new BehaviorSubject<boolean>(true);
  CurrentMessage = this.showIntroSceneIfTrue.asObservable();

  constructor() { }

  changeMessage(message: boolean){
    this.showIntroSceneIfTrue.next(message);
  }

}
