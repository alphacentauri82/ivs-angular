import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import { registerIVSTech } from 'amazon-ivs-player';
import {environment} from '../environments/environment';


@Component({
  selector: 'app-vjs-player',
  template: `
    <video
      #target
      class="video-js"
      controls
      muted
      playsinline
      preload="none"></video>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/maintutorial-options.html
  @Input() options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    sources: {
      src: string,
      type: string
    }[],
  };
  player: videojs.Player;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    registerIVSTech(videojs,  {
      wasmWorker: '/assets/amazon-ivs-wasmworker.min.js',
      wasmBinary: '/assets/amazon-ivs-wasmworker.min.wasm',
    });

    // instantiate Video.js
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      () => {
        this.player.src(environment.APP_CHAN_ENDPOINT);
        console.log('onPlayerReady', this);
      }
    );
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
