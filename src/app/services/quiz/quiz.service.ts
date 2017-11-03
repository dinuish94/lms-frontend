import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { generateQuizUrl, generateQuizMarksUrl } from '../../config/constants';

import { Quiz } from '../../models/quizDTO.model';
import { Question } from '../../models/question.model';
import { Answer } from '../../models/answer.model';
import { QuizMark } from '../../models/quizMarks.model';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { 
  }

  get(id: number) {
    return this.http.get<Quiz>(generateQuizUrl(id));
  }

  post(quizMark) {
    return this.http.post(generateQuizMarksUrl(quizMark.quiz),quizMark);
  }

  qu
}
