import {Component, OnInit, Input, HostBinding} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import postscribe from 'postscribe';

@Component({
  selector: 'app-city',
  templateUrl: './city.html',
  styleUrls: ['./city.scss']
})

export class CityComponent implements OnInit {

  api = '730a4f921d9336f2c6284ae5cadcba88';

  @Input()
  city;

  @Input()
  index;

  expanded = false;
  showDetails = false;
  forecast;
  fiveDay = [];
  link;

  constructor(
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  convert(kelvin) {
    return Math.round((kelvin - 273) * (1.8) + 32);
  }

  changeDesc(desc) {
    if (desc === 'Clouds') {
      return 'Cloudy';
    } else if (desc === 'Smoke') {
      return 'Smokey';
    } else if (desc === 'Rain') {
      return 'Raining';
    } else if (desc === 'Snow') {
      return 'Snowing';
    } else {
      return desc;
    }
  }

  calcHsl(num) {
    const newNum = Math.round(num);
    if (newNum > 287) {
      return Math.abs(newNum - 320);
    } else {
      const percent = 1 / 60 * newNum;
      return Math.round(percent * 50);
    }
  }

  expand() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      const ajax = new XMLHttpRequest();
      ajax.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?q=' + this.city.name + '&appid=' + this.api, false);
      ajax.send();
      this.fiveDay = [];
      this.forecast = JSON.parse(ajax.responseText);
      if (this.forecast.list) {
        let i;
        for (i = 7; i < this.forecast.list.length; i = i + 8) {
          this.fiveDay.push(this.forecast.list[i]);
        }
      }

      setTimeout(() => {
        this.city.coord.lat = this.city.coord.lat - .1;
        this.link = 'https://darksky.net/map-embed/@radar,' + this.city.coord.lat + ',' + this.city.coord.lon + ',10.js?embed=true&timeControl=false&fieldControl=false&defaultField=radar';
        const script = '<script src="' + this.link + '"></script>';
        postscribe('#darkSky-' + this.index, script);
      }, 10);

    } else {
      this.showDetails = false;
    }
  }

  windDirection(degree) {
    const val = Math.floor((degree / 22.5) + 0.5);
    const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return arr[(val % 16)];
  }

  round(num) {
    return Math.round(num);
  }

  getTime(epoch) {
    const d = new Date(0);
    d.setUTCSeconds(epoch);
    let hours = d.getHours();
    const minutes = this.minutes_with_leading_zeros(d);
    if (hours > 12) {
      hours = hours - 12;
    }
    return hours + ':' + minutes;
  }

  minutes_with_leading_zeros(dt) {
    return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
  }

  convertDay(day) {
    const newDay = day.dt_txt.replace(' ', 'T');
    const d = new Date(newDay);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[d.getDay()];
  }

  getClass(name) {
    if (name === 'Clear') {
      return 'fa-sun';
    } else  if (name === 'Clouds') {
      return 'fa-cloud-sun';
    } else if (name === 'Rain') {
      return 'fa-cloud-showers-heavy';
    } else if (name === 'Snow') {
      return 'fa-snowflake';
    }
  }

  @HostBinding('style')
  get style() {
    return this.sanitizer.bypassSecurityTrustStyle(`
      --temp: ${this.calcHsl(this.city.main.temp)};
    `);
  }
}
