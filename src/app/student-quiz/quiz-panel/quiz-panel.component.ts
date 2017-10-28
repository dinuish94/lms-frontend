import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Question } from '../../models/question.model';
 import { AnsweredQuestion } from '../../models/answeredQuestion.model';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz-panel',
  templateUrl: './quiz-panel.component.html',
  styleUrls: ['./quiz-panel.component.css']
})
export class QuizPanelComponent implements OnInit {
  @Input() questions: Question[];
  @Input() answeredQuestions: AnsweredQuestion[];
  @Input() currentQuestion: Question;
  @Input() currentIndex: number;
  @Output() navigate: EventEmitter<number> = new EventEmitter<number>();

  count: number = 3600;
  countDown;
  constructor() { 
  }

  setButtonClass(index) {
    if (index === this.currentIndex) {
      return 'btn-primary';
    } else if (this.isAnswered(index)) {
      return 'btn-info';
    } else if(this.questions[index].flagged) {
      return 'btn-warning';
    } else {
      return 'btn-default';
    }
  }

  isAnswered(index) {
    let answered = this.answeredQuestions.findIndex(result => 
      result.question === this.questions[index]
    );

    if (answered != -1) {
      return true;
    }
  }

  ngOnInit() {
    this.countDown = Observable.timer(0,1000)
    .take(this.count)
    .map(()=> --this.count);
  }

  goTo(index) {
    console.log(index);
    this.navigate.emit(index);
  }


}
