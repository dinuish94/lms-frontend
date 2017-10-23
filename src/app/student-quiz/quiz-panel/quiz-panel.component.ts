import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Question } from '../../models/question.model';

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
    
  }

}
