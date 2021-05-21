import { Injectable } from '@angular/core';
import  { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  private messageSource = new BehaviorSubject<number>(666);
  CurrentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: number){
    this.messageSource.next(message);
  }

}
