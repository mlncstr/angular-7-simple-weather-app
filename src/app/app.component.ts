import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  api = '[your-api-key-here]';
  city1;
  city2;
  city3;
  city4;

  constructor() {}

  ngOnInit() {
    const ajax1 = new XMLHttpRequest();
    ajax1.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Houston&appid=' + this.api, false);
    ajax1.send();
    this.city1 = JSON.parse(ajax1.responseText);

    const ajax2 = new XMLHttpRequest();
    ajax2.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=' + this.api, false);
    ajax2.send();
    this.city2 = JSON.parse(ajax2.responseText);

    const ajax3 = new XMLHttpRequest();
    ajax3.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=New+York&appid=' + this.api, false);
    ajax3.send();
    this.city3 = JSON.parse(ajax3.responseText);

    const ajax4 = new XMLHttpRequest();
    ajax4.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=' + this.api, false);
    ajax4.send();
    this.city4 = JSON.parse(ajax4.responseText);
  }
}
