import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback/feedback.service';
import { Feedback } from '../models/feedback.model';

@Component({
  selector: 'app-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrls: ['./student-feedback.component.css'],
  providers: [FeedbackService]
})
export class StudentFeedbackComponent implements OnInit {

  feedbacks : Feedback[];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.getFeedBackSessions();
  }

  getFeedBackSessions(){
    this.feedbackService.getFeedbackSessions().subscribe(feedbacks => {
      this.feedbacks = feedbacks;
    });
  }

}

