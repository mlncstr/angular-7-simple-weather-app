import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  api = '[your-api-key-here]';
  city1name = 'Houston';
  city2name = 'Chicago';
  city3name = 'Madrid';
  city4name = 'Tokyo';
  city1;
  city2;
  city3;
  city4;

  modal = false;

  constructor() {}

  ngOnInit() {
    this.setCities();
    this.getWeather();
  }

  setCities() {
    if (window.localStorage) {
      if (window.localStorage.getItem('city1name')) {
        this.city1name = window.localStorage.getItem('city1name');
      } else {
        window.localStorage.setItem('city1name', this.city1name);
      }
      if (window.localStorage.getItem('city2name')) {
        this.city2name = window.localStorage.getItem('city2name');
      } else {
        window.localStorage.setItem('city2name', this.city2name);
      }
      if (window.localStorage.getItem('city3name')) {
        this.city3name = window.localStorage.getItem('city3name');
      } else {
        window.localStorage.setItem('city3name', this.city3name);
      }
      if (window.localStorage.getItem('city4name')) {
        this.city4name = window.localStorage.getItem('city4name');
      } else {
        window.localStorage.setItem('city4name', this.city4name);
      }
    }
  }

  getWeather() {
    const ajax1 = new XMLHttpRequest();
    ajax1.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + this.city1name + '&appid=' + this.api, false);
    ajax1.send();
    this.city1 = JSON.parse(ajax1.responseText);

    const ajax2 = new XMLHttpRequest();
    ajax2.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + this.city2name + '&appid=' + this.api, false);
    ajax2.send();
    this.city2 = JSON.parse(ajax2.responseText);

    const ajax3 = new XMLHttpRequest();
    ajax3.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + this.city3name + '&appid=' + this.api, false);
    ajax3.send();
    this.city3 = JSON.parse(ajax3.responseText);

    const ajax4 = new XMLHttpRequest();
    ajax4.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + this.city4name + '&appid=' + this.api, false);
    ajax4.send();
    this.city4 = JSON.parse(ajax4.responseText);
  }

  changeCities(event) {
    event.stopPropagation();
    event.preventDefault();
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
    window.localStorage.setItem('city1name', this.city1name);
    window.localStorage.setItem('city2name', this.city2name);
    window.localStorage.setItem('city3name', this.city3name);
    window.localStorage.setItem('city4name', this.city4name);
    this.getWeather();
  }
}
