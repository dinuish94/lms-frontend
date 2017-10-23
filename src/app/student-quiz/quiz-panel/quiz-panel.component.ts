import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Question } from '../../models/question.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz-panel',
  templateUrl: './quiz-panel.component.html',
  styleUrls: ['./quiz-panel.component.css']
})
export class QuizPanelComponent implements OnInit {
  @Input() questions: Question[];
  @Input() answeredQuestions: Question[];
  @Input() currentQuestion: Question;
  @Input() currentIndex: number;
  count: number = 3600;
  countDown;
  constructor() { 
  }

  setButtonClass(index) {
    if (index === this.currentIndex) {
      return 'btn-primary';
    } else if (this.answeredQuestions.indexOf(this.questions[index]) !== -1) {
      return 'btn-info';
    } else {
      return 'btn-default';
    }
  }

  ngOnInit() {
    this.countDown = Observable.timer(0,1000)
    .take(this.count)
    .map(()=> --this.count);
  }

}
