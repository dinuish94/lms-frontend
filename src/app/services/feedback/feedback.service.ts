import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedbackService {

  constructor(private http: Http) { }

  getFeedbackSessions(){
    return this.http.get('http://localhost:8080/feedbacks/')
    .map(res => res.json());
  }

  getQuestions(fId){
    return this.http.get('http://localhost:8080/feedbacks/'+fId+'/questions')
    .map(res => res.json());
  }

  submitAnswers(answers){
    return this.http.post('http://localhost:8080/feedbacks/feedback-answers',answers)
    .map(res => res);
  }


}
