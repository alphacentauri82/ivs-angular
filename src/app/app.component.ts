import {Component, OnInit} from '@angular/core';

import {environment} from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{


  videoOptions = {
    sources: [{
      src: environment.APP_CHAN_ENDPOINT,
      type: 'application/x-mpegURL'
    }],
    autoplay: true,
    controls: true,
    techOrder: ['AmazonIVS'],
    width: '800'
  };


}
