import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Chart } from 'chart.js';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private chart = [];

  constructor(private _weahterService: WeatherService) { }

  ngOnInit() {
    this._weahterService.dailyForecast()
      .subscribe(res => {
        console.log(res);
        let temp_max = res['list'].map(res => res.main.temp_max);
        let temp_min = res['list'].map(res => res.main.temp_min);
        let alldates = res['list'].map(res => res.dt);

        let weatherDates = [];
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000);
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}));
        });

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: 'red',
                fill: false
              },
              {
                data: temp_min,
                borderColor: 'black',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        });
      });
  }
}
