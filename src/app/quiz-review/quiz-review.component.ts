import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { QuizService } from '../services/quiz/quiz.service';
import { MarkQuizService } from '../services/mark-quiz/mark-quiz.service';

import { QuizMark1 } from '../models/quizMarks/quizMark.model';
import { answeredQuestion } from '../models/answeredQuestion.model';

@Component({
  selector: 'app-quiz-review',
  templateUrl: './quiz-review.component.html',
  styleUrls: ['./quiz-review.component.css']
})
export class QuizReviewComponent implements OnInit {
  answeredQuestions: answeredQuestion[] = new Array();
  quiz: QuizMark1;
  quizId: number;
  questionCount: any;

  constructor(private _quizMarkService: MarkQuizService, private _quizService: QuizService, private _router: ActivatedRoute) { }

  ngOnInit() {
    this.quizId = this._router.snapshot.params['quizId'];
    this._quizService.getMark(1,1).subscribe(quizMark => {
      this.quiz = new QuizMark1(quizMark);
      this.answeredQuestions = this.quiz.correctQuestions;
      this.getquestionCount();
    });
  }

  getquestionCount() {
    let correct: number=0;
    let all: number=0;
    this.answeredQuestions.forEach(answeredQuestion => {
      if (answeredQuestion.question.correctAnswer === answeredQuestion.selectedAnswer) {
        correct++;
      }
      all++;
    });
    this.questionCount = {
      all: all,
      correct: correct
    }
  }

  isCorrect(index) {
    return this.answeredQuestions[index].question.correctAnswer === this.answeredQuestions[index].selectedAnswer;
  }

}
