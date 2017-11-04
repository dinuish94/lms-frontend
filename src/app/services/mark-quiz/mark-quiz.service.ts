import { Injectable, OnInit } from '@angular/core';

import { Question } from '../../models/question.model';
import { Quiz } from '../../models/quizDTO.model';
import { QuizMark1 } from '../../models/quizMarks/quizMark.model';
import { AnsweredQuestion } from '../../models/answeredQuestion.model';

@Injectable()
export class MarkQuizService implements OnInit {
  quiz: Quiz;
  questions: Question[];
  answeredQuestions: AnsweredQuestion[] = new Array();
  AnsweredQuestionDTO: AnsweredQuestion[] = new Array();
  student: any;
  marks: number;
  quizMark: QuizMark1 = new QuizMark1();

  constructor() { }

  ngOnInit() {
    this.setStudent();
  }

  setStudent() {
    this.student = JSON.parse(localStorage.getItem("authUser"));
  }

  setQuiz(quiz: Quiz) {
    this.quiz = quiz;
  }

  setQuestions(questions: Question[]) {
    this.questions = questions;
  }

  setAnsweredQuestions(answeredQuestions: AnsweredQuestion[]) {
    this.answeredQuestions = answeredQuestions; 
  }

  submitQuiz(quiz: Quiz, answeredQuestions: AnsweredQuestion[]) {
    this.setStudent();
    this.setQuiz(quiz);
    this.setAnsweredQuestions(answeredQuestions);
  }

  markQuiz() {
    let answeredQuestion: AnsweredQuestion;
    let correctCount: number = 0;

    this.answeredQuestions.forEach(answeredQuestion => {
      if (answeredQuestion.question.correctAnswer === answeredQuestion.selectedAnswer) {
        correctCount++;
      }
      this.pushToDto(answeredQuestion);
    });
    
    this.calculateMarks(correctCount);
  }

  pushToDto(answeredQuestion: AnsweredQuestion) {
    this.AnsweredQuestionDTO.push({
      question: answeredQuestion.question.queId,
      selectedAnswer: answeredQuestion.selectedAnswer
    });
  }

  getQuestionById(questionId: number) {
    let index = this.questions.findIndex(result => result.queId === questionId);
    return this.questions[index];
  }

  calculateMarks(correctCount) {
    this.marks = correctCount*1;
  }

  setStudentMark() {
    this.quizMark.quiz = this.quiz.qId;
    this.quizMark.student = this.student.id;
    this.quizMark.answeredQuestions = this.AnsweredQuestionDTO;
    this.quizMark.marks = this.marks;
  }

  getStudentMark() {
    return this.quizMark;
  }
}
