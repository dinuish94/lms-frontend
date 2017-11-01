import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-feedback-session',
  templateUrl: './student-feedback-session.component.html',
  styleUrls: ['./student-feedback-session.component.css']
})
export class StudentFeedbackSessionComponent implements OnInit {

  currentDate : number;
  constructor() { 
    this.currentDate = Date.now();
  }

  ngOnInit() {
    
  }

}
