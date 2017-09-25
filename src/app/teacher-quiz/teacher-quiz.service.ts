import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Quiz } from '../models/quiz.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class TeacherQuizService {

  constructor(private _http: Http) { }

  private _addquizurl = 'http://localhost:8080/quizzes/';

  addNewQuiz(quiz: Quiz): Observable<Quiz> {
    return this._http.post(this._addquizurl,quiz)
      .map((response: Response) => <Quiz>response.json())
      .do(data => console.log(JSON.stringify(data)));
    // this.courses.push(new Course({name:'SET'}))
    // return this.courses;
  }

}
