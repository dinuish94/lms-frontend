import { Component, OnInit, OnChanges, AfterViewChecked } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewChecked {
  fullPage: boolean = false;

  constructor(public location: Location) {
    if (this.location.path() === '/student-quiz') {
      this.fullPage = true;
    } else {
      this.fullPage = false;
    }
  }

  ngOnInit() {
      $.material.options.autofill = true;
      $.material.init();
  }

  ngAfterViewChecked() {
    if (this.location.path() === '/student-quiz') {
      this.fullPage = true;
    } else {
      this.fullPage = false;
    }
  }
}
