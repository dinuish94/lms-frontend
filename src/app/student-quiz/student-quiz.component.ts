import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz/quiz.service';
import { CourseService } from '../services/course/course.service';
import { StudentService } from '../services/student/student.service';

import { Quiz } from '../models/quizDTO.model';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.css']
})
export class StudentQuizComponent implements OnInit {
  quiz: Quiz;
  questions: Question[] = new Array();
  question: Question = new Question();
  index: number = 0;
  answers: Answer[] = new Array();
  selectedAnswer: string;
  answer; Answer;
  course: string;
  quizNo: number;
  count: number = 3600;
  countDown;

  constructor(private _quizService: QuizService) {
    this.countDown = Observable.timer(0,1000)
    .take(this.count)
    .map(()=> --this.count);
}

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz() {
    this._quizService.get(1).subscribe(response => {
      this.quiz = response;
      console.log(this.quiz);
      this.questions = this.quiz.questions;
      this.question = this.questions[0];
      this.course = this.quiz.course.name;
      this.quizNo = this.quiz.qId;
    });
  }

  next() {
    this.addAnswer();
    this.question = this.questions[++this.index];
  }

  prev() {
    this.addAnswer();
    this.question = this.questions[--this.index];
  }

  disable() {
    return this.index <= this.questions.length;
  }

  addAnswer() {
    console.log(this.selectedAnswer);
    if (this.answered() != -1) {
      this.answers.splice(this.answered(), 1);
    }
    this.answers.push(new Answer(this.question.queId, this.selectedAnswer));
  }

  private answered() {
    return this.answers.findIndex(result => result.question === this.question.queId);
  }

  last() {
    return this.index === this.questions.length - 1;
  }

  submit() {
    this.addAnswer();

    this._quizService.submitQuiz(this.quiz, this.questions, this.answers).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
