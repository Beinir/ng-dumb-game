import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-dumb-game';
  user = this.http.get<any[]>('http://localhost:4201/user');
  test = this.http.get<any[]>('http://localhost:4201/test');
  highScore;

  constructor(private http: HttpClient) {}

  ngOnInit(){
   //this.test.subscribe(data => {console.log(data)});
    this.http.get('http://localhost:4201/score').subscribe((data) => {
        this.highScore = data;
        console.log(this.highScore.score)
    });

  }
}

