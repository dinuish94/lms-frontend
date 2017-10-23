import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService } from '../services/quiz/quiz.service';
import { MarkQuizService } from '../services/mark-quiz/mark-quiz.service';

import { Quiz } from '../models/quizDTO.model';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { QuizMark } from '../models/quizMarks.model';

import { Observable } from 'rxjs';
import swal from 'sweetalert2';


@Component({
  selector: 'app-student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.css']
})
export class StudentQuizComponent implements OnInit {
  quiz: Quiz;
  questions: Question[] = new Array();
  answeredQuestions: Question[] = new Array();
  question: Question = new Question();
  index: number = 0;
  answers: Answer[] = new Array();
  selectedAnswer: string;
  answer; Answer;
  course: string;
  quizNo: number;
  count: number = 3600;
  countDown;
  showPanel: boolean = false;
  quizMark: QuizMark = new QuizMark();

  constructor(private _quizService: QuizService, private _quizMarkService: MarkQuizService, private _router: Router) {
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
      this.showPanel = true;
      this.question = this.questions[0];
      this.course = this.quiz.course.name;
      this.quizNo = this.quiz.qId;
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
    let index = this.answers.findIndex(result => result.question === this.question.queId);

    if (index !== -1) {
      this.selectedAnswer = this.answers[index].selectedAnswer;
      console.log('answer is ',this.selectedAnswer);
    }
  }

  addAnswer() {
    if (this.answered() != -1) {
      this.answers.splice(this.answered(), 1);
    }

    if ((this.selectedAnswer !== '') && (this.selectedAnswer !== undefined)) {
      this.answeredQuestions.push(this.question);
      this.answers.push(new Answer(this.question.queId, this.selectedAnswer));
      this.selectedAnswer='';
    }
    
  }

  private answered() {
    return this.answers.findIndex(result => result.question === this.question.queId);
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

  navigateCallback(index) {
    console.log('did index come',index);
    this.question = this.questions[index];
    this.index = index;
    this.setAnswer();
  }

  submitQuiz() {
    this._quizMarkService.submitQuiz(this.quiz,this.answers);
    this._quizMarkService.markQuiz();
    this._quizMarkService.setStudentMark();
    this.quizMark = this._quizMarkService.getStudentMark();

  }

  submitAlert() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to attempt the quiz again",
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'submit',
      cancelButtonText: 'cancel'
    }).then(()=> {
      this.submitQuiz();
      this._quizService.post(this.quizMark).subscribe(any => {
        this.submittedAlert();
      });    
    }, function(dismiss) {
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
    this._router.navigate(['review-quiz']); 
  }
}
