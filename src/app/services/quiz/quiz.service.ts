import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { generateQuizUrl } from '../../config/constants';
import { Quiz } from '../../models/quiz.model';
import { AddedQuiz } from '../../models/addedQuiz.model';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { 
  }

  get() {
    let header = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    console.log(header);
    this.http.get<AddedQuiz[]>(generateQuizUrl(),{headers: header}).subscribe(data => {
      return data;
    },error => {
      console.log(error);
    });
  }

}
