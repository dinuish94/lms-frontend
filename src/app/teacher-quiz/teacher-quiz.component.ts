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

  course: number;
  quiz: Quiz = new Quiz();
  showAnswersDiv : boolean;

  constructor(private _teacherQuizService: TeacherQuizService, private _route:ActivatedRoute) { }

  ngOnInit() {
    this.course = this._route.snapshot.params['cId'];
    this.showAnswersDiv = false;
  }

  addNewQuiz () {
    this.quiz.course = this.course;
    console.log('******'+JSON.stringify(this.quiz));
    this._teacherQuizService.addNewQuiz(this.quiz).subscribe(quiz => {
      // return quiz;
      this.showAnswersDiv = true;
      console.log(quiz);
      
    });
  }

}
