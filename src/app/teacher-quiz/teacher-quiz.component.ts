import { Component, OnInit } from '@angular/core';
import { TeacherQuizService } from './teacher-quiz.service';
import { Course } from '../models/course.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Quiz } from '../models/quiz.model';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import {EditQuestionModalComponent} from '../edit-question-modal/edit-question-modal.component';

@Component({
  selector: 'app-teacher-quiz',
  templateUrl: './teacher-quiz.component.html',
  styleUrls: ['./teacher-quiz.component.css'],
  providers: [TeacherQuizService]
})
export class TeacherQuizComponent implements OnInit {

  quizNo: number;
  answers: String[];
  answer: String;
  quiz: Quiz;
  question: String;
  questions: Quiz[];
  showDialog = false;
  addQuestion: boolean;
  questionId : number;

  constructor(private _teacherQuizService: TeacherQuizService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.quizNo = this._route.snapshot.params['qId'];
    this.answers = [];
    this.questions = [];
    this.quiz = new Quiz();
    this.getQuestions();
    this.addQuestion = true;
    this.getQuizById();
  }

  addAnswer() {
    this.answers.push(this.answer);
  }

  removeAnswer(answer: String) {
    const index: number = this.answers.indexOf(answer);
    if (index !== -1) {
      this.answers.splice(index, 1);
    }
  }

  addQuiz() {
    if(this.addQuestion){
      this.quiz.answers = this.answers;
      this.quiz.qId = this.quizNo;
      this.quiz.question = this.question
      this._teacherQuizService.addQuestionsToQuiz(this.quiz).subscribe(quiz => {
  
        this.getQuestions();
      });
    } else {
      this._teacherQuizService.editQuestion(this.quizNo, this.questionId, this.quiz).subscribe(data => {

        this.addQuestion = true;
        this.getQuestions();
      })
    }
    this.answers = [];
    this.quiz.correctAnswer = "";
    this.quiz.name = "";
    this.question = "";
    this.answer = "";
    
  }

  getQuestions() {
    this._teacherQuizService.getAllQuestions(this.quizNo).subscribe(quizzes => {
      this.questions = quizzes;
    });
  }

  deleteQuestion(queId: number) {
    this._teacherQuizService.deleteQuestion(this.quizNo, queId).subscribe(data => {
      this.getQuestions();
    })
  }

  editQuestion(queId: number) {
    this.getQuestion(queId);
    this.quiz.answers = this.answers;
    this.quiz.qId = this.quizNo;
    this.quiz.question = this.question;
    this.addQuestion = false;
    this.questionId = queId;
  }

  getQuestion(queId: number) {
    this._teacherQuizService.getQuestionById(this.quizNo, queId).subscribe(data => {
      this.question = data.question;
      this.answers = data.answers;
      this.quiz = data;
    })
  }

  editAnswer(answer: String) {
    this.answer = answer;
  }

  getQuizById() {
    this._teacherQuizService.getQuizById(this.quizNo).subscribe(data => {
      this.quiz.name = data.name;
      this.quiz.date = data.date;
      this.quiz.duration = data.duration;
      this.questions = data.questions;
      this.quiz.active = data.active;
    })
  }

  markAsActive(){
    this._teacherQuizService.markQuizAsActive(this.quizNo).subscribe(data => {
      this.getQuizById();
    })
  }


}
