import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService } from '../services/quiz/quiz.service';
import { MarkQuizService } from '../services/mark-quiz/mark-quiz.service';

import { Quiz } from '../models/quizDTO.model';
import { Question } from '../models/question.model';
import { AnsweredQuestion } from '../models/answeredQuestion.model';
import { QuizMark1 } from '../models/quizMarks/quizMark.model';


import { Observable } from 'rxjs';
import swal from 'sweetalert2';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.css']
})
export class StudentQuizComponent implements OnInit {
  quiz: Quiz;
  questions: Question[] = new Array();
  answeredQuestions: AnsweredQuestion[] = new Array();
  question: Question = new Question();
  index: number = 0;
  selectedAnswer: string;
  answer; Answer;
  course: string;
  quizNo: number;
  count: number = 3600;
  countDown;
  showPanel: boolean = false;
  quizMark: QuizMark1 = new QuizMark1();
  quizId: number;

  constructor(private _quizService: QuizService, private _quizMarkService: MarkQuizService, private _router: Router, private _route: ActivatedRoute) {

  }

  ngOnInit() {
    this.quizId = this._route.snapshot.params['quizId'];
    this.getQuiz();
  }

  getQuiz() {
    this._quizService.get(this.quizId).subscribe(response => {
      this.quiz = response;
      console.log(this.quiz);
      this.questions = this.quiz.questions;
      this.showPanel = true;
      this.question = this.questions[0];
      this.course = this.quiz.course.name;
      this.quizNo = this.quiz.qId;
      this.mapAnsweredQuestions();
    });
  }

  next() {
    this.addAnswer();
    this.question = this.questions[++this.index];
    this.setAnswer();
  }

  prev() {
    this.addAnswer();
    this.question = this.questions[--this.index];
    this.setAnswer();
  }

  disable() {
    return this.index <= this.questions.length;
  }

  setAnswer() {
    let index = this.answeredQuestions.findIndex(result => result.question === this.question);

    if (index !== -1) {
      this.selectedAnswer = this.answeredQuestions[index].selectedAnswer;
    } else {
      this.selectedAnswer = "";
    }
  }

  addAnswer() {
    let answeredQuestion = this.answeredQuestions[this.answered()];

    // if (this.answered() != -1) {
    //   this.answeredQuestions.splice(this.answered(), 1);
    // }

    if ((this.selectedAnswer !== '') && (this.selectedAnswer !== undefined)) {
      answeredQuestion.question = this.question;
      answeredQuestion.selectedAnswer = this.selectedAnswer;
      //this.answeredQuestions.push(answeredQuestion);
      this.selectedAnswer = '';
    }
  }
  

  mapAnsweredQuestions() {
    this.questions.forEach(question => {
      let answeredQ = new AnsweredQuestion();
      answeredQ.question = question;
      answeredQ.selectedAnswer = '-';
      this.answeredQuestions.push(answeredQ);
    });
  }

  private answered(index?) {
    if (index) {
      let question = this.questions[index];
      return this.answeredQuestions.findIndex(result => result.question === question);
    } else {
      return this.answeredQuestions.findIndex(result => result.question === this.question);
    }
  }

  last() {
    return this.index === this.questions.length - 1;
  }

  onSubmit() {
    this.addAnswer();
    this.submitAlert();
  }

  flag() {
    this.question.flagged = !this.question.flagged;
  }

  navigateCallback(indexes) {
    this.addAnswer();
    this.question = this.questions[indexes.newIndex];
    this.index = indexes.newIndex;
    this.setAnswer();
  }

  submitQuiz() {
    this._quizMarkService.submitQuiz(this.quiz, this.answeredQuestions);
    this._quizMarkService.markQuiz();
    this._quizMarkService.setStudentMark();
    this.quizMark = this._quizMarkService.getStudentMark();
  }

  timeUpSubmit(event) {
    swal(
      'Your time is up!',
      'The quiz would be submitted',
      'warning'
    );

    this.submitQuiz();

    this._quizService.post(this.quizMark).subscribe(any => {
    });
    setTimeout(() => {
      this._router.navigateByUrl('/review-quiz/' + this.quizId);
    }, 2000);
  }

  submitAlert() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to attempt the quiz again",
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'submit',
      cancelButtonText: 'cancel'
    }).then(() => {
      this.submitQuiz();
      console.log(this.quizMark);
      this._quizService.post(this.quizMark).subscribe(any => {
        this.submittedAlert();
      });
    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
      }
    })
  }

  submittedAlert() {
    swal(
      'Success!',
      'your answers have been submitted',
      'success'
    );
    setTimeout(() => {
      this._router.navigateByUrl('/review-quiz/' + this.quizId);
    }, 2000);
  }
}
