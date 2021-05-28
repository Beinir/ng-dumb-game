import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-dumb-game';

  messages = this.http.get<any[]>('http://localhost:4201');
  alphas:any[];

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.messages.forEach(function (value){
      console.log(value);
      console.log('This Works');
    });;
  }

}
