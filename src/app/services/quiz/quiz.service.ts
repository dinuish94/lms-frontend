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

  submitQuiz(quiz: Quiz,questions: Question[],answers: Answer[]) {
    let marks = this.markQuiz(questions,answers);
    let quizMark = this.generateMarkQuizResponse(quiz.qId,marks.correctQuestions,marks.totalMarks);
    console.log(quizMark);
    return this.post(quizMark);
  }

  markQuiz(questions: Question[],answers: Answer[]) {
    let correctQuestions: number[] = new Array();
    let correctQuestionCount = 0;

    questions.forEach(question => {
      let answerId = answers.findIndex(result => result.question === question.queId);
      if (question.correctAnswer === answers[answerId].selectedAnswer) {
        correctQuestions.push(question.queId);
        correctQuestionCount++;
      }
    });
    return this.calculateMarks(correctQuestions,correctQuestionCount);
  }

  calculateMarks(correctQuestions,correctQuestionCount) {
    return {
      correctQuestions: correctQuestions,
      totalMarks: correctQuestionCount * 1
    };
  }

  generateMarkQuizResponse(quizId: number,correctQuestions: number[], marks: number) {
    let quizMarks = new QuizMark();
    
    quizMarks.quiz = quizId;
    quizMarks.student = 1;//get from session;
    quizMarks.marks = marks;
    quizMarks.correctQuestions = correctQuestions;

    return quizMarks;
  }
}
