import { Component } from '@angular/core';
import { HttpService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-http';
  constructor(private httpService: HttpService) {

  }

  getRequest() {
    this.httpService.get('http://localhost:4200').subscribe(res => {
      console.log('res : ', res);
    }, err => {
      console.log('Failed to complete your request');
    });
  }

  postRequest() {
    let payload = {
      params1: 'params1',
      params2: 'params2'
    };
    this.httpService.post('http://localhost:4200', payload).subscribe(res => {
      console.log('res : ', res);
    }, err => {
      console.log('Failed to complete your request');
    });
  }
}
