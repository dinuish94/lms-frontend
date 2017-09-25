import { Component, OnInit } from '@angular/core';
import { TeacherQuizService } from './teacher-quiz.service';
import { Course } from '../models/course.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Quiz } from '../models/quiz.model';
import 'rxjs/add/operator/map';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private _teacherQuizService: TeacherQuizService, private _route:ActivatedRoute) { }

  ngOnInit() {
    this.quizNo = this._route.snapshot.params['qId'];
    this.answers = [];
    this.quiz = new Quiz();
  }

  addAnswer(){
    this.answers.push(this.answer);
    console.log(this.answers);
  }

  removeAnswer(answer: String){
    const index: number = this.answers.indexOf(answer);
    if (index !== -1) {
        this.answers.splice(index, 1);
    } 
    console.log(this.answers);
  }

  addQuiz() {
    this.quiz.answers = this.answers;
    this.quiz.quizId = this.quizNo;
    console.log(JSON.stringify(this.quiz));
    this._teacherQuizService.addQuestionsToQuiz(this.quiz).subscribe(quiz => {
      console.log(quiz);
    });
  }

}
