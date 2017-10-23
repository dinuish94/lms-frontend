import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz/quiz.service';
import { CourseService } from '../services/course/course.service';
import { StudentService } from '../services/student/student.service';

import { Quiz } from '../models/quizDTO.model';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';

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

  submit() {
    this.addAnswer();
    this.submitAlert()
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

  submitAlert() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to attempt the quiz again",
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'submit',
      cancelButtonText: 'cancel'
    }).then(()=> {
      this._quizService.submitQuiz(this.quiz, this.questions, this.answers).subscribe(response => {
        swal(
          'Success!',
          'your answers have been submitted',
          'success'
        )
      });      
    }, function(dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
      }
    })
  }
}
