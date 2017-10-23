import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fullPage: boolean = false;

  constructor(public location: Location) {
    if (this.location.path() === '/student-quiz') {
      this.fullPage = true;
    }
  }

  ngOnInit() {
      $.material.options.autofill = true;
      $.material.init();
  }
}
