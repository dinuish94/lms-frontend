import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { generateQuizUrl } from '../../config/constants';
import { Quiz } from '../../models/quiz.model';
import { AddedQuiz } from '../../models/addedQuiz.model';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { 
  }

  get() {
    this.http.get<AddedQuiz[]>('/api/items').subscribe(data => {
      return data;
    });
  }

}
