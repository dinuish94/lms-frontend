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

  constructor(private _quizService: QuizService, private _quizMarkService: MarkQuizService, private _router: Router) {
    
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
    let index = this.answeredQuestions.findIndex(result => result.question === this.question);

    if (index !== -1) {
      this.selectedAnswer = this.answeredQuestions[index].selectedAnswer;
    }
  }

  addAnswer() {
    let answeredQuestion = new AnsweredQuestion();
    if (this.answered() != -1) {
      this.answeredQuestions.splice(this.answered(), 1);
    }

    if ((this.selectedAnswer !== '') && (this.selectedAnswer !== undefined)) {
      answeredQuestion.question = this.question;
      answeredQuestion.selectedAnswer = this.selectedAnswer;
      this.answeredQuestions.push(answeredQuestion);
      this.selectedAnswer='';
    }
    
  }

  private answered() {
    return this.answeredQuestions.findIndex(result => result.question === this.question);
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
    this._quizMarkService.submitQuiz(this.quiz,this.answeredQuestions);
    this._quizMarkService.markQuiz();
    this._quizMarkService.setStudentMark();
    this.quizMark = this._quizMarkService.getStudentMark();
    console.log("quiz mark",this.quizMark);

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
    setTimeout(()=> {
      this._router.navigateByUrl('/review-quiz/1'); 
    },2000);
  }
}
