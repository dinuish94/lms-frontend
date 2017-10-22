import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Quiz } from '../models/quiz.model';
import { AddedQuiz } from '../models/addedQuiz.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class TeacherQuizService {

  constructor(private _http: Http) { }

  private _addquizurl = 'http://localhost:8080/quizzes/';

  addNewQuiz(quiz: Quiz): Observable<Quiz> {
    return this._http.post(this._addquizurl, quiz)
      .map((response: Response) => <Quiz>response.json())
      // .do(data => console.log(JSON.stringify(data)));
  }

  addQuestionsToQuiz(quiz: Quiz): Observable<Quiz> {
    return this._http.post(this._addquizurl + quiz.qId + '/questions/', quiz)
      .map((response: Response) => <Quiz>response.json())
      // .do(data => console.log(JSON.stringify(data)));
  }

  getAllQuestions(quizId: number): Observable<Quiz[]> {
    return this._http.get(this._addquizurl + quizId)
      .map((response: Response) => response.json().questions)
      // .do(data => JSON.stringify(data));
  }

  deleteQuestion(quizId: number, queId: number): Observable<String> {
    return this._http.delete(this._addquizurl + quizId + '/questions/' + queId)
      .map((response) => response.text())
  }

  getQuestionById(quizId: number, queId: number): Observable<Quiz> {
    return this._http.get(this._addquizurl + quizId + '/questions/' + queId)
      .map((response) => <Quiz>response.json())
      // .do(data => console.log(JSON.stringify(data)));
  }

  editQuestion(quizId: number, queId: number, quiz: Quiz): Observable<Quiz> {
    return this._http.put(this._addquizurl + quizId + '/questions/' + queId,quiz)
    .map((response) => <Quiz>response.json())
    // .do(data => console.log(JSON.stringify(data)));
  }

  getAllQuizzes(cId: number): Observable<AddedQuiz[]>{
    return this._http.get(this._addquizurl + '/course/' + cId)
    .map((response) => <AddedQuiz[]>response.json())
    .do(data => console.log(JSON.stringify(data))+"*****************");
  }

  getQuizById(quizId: number): Observable<AddedQuiz> {
    return this._http.get(this._addquizurl + quizId)
      .map((response: Response) => response.json())
      .do(data => JSON.stringify(data));
  }

  markQuizAsActive(quizId: number): Observable<AddedQuiz> {
    return this._http.get(this._addquizurl + quizId + "/active")
    .map((response: Response) => response.json())
    .do(data => JSON.stringify(data));
  }

}
