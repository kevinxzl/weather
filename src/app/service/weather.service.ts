import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get('http://api.openweathermap.org/data/2.5/forecast?zip=91765,us&appid=263a76f5a87a2c77f82e5e6da3c460e0')
      .map(result => result);
  }

}
