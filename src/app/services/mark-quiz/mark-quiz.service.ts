import { Injectable, OnInit } from '@angular/core';

import { Question } from '../../models/question.model';
import { Answer } from '../../models/answer.model';
import { Quiz } from '../../models/quizDTO.model';
import { QuizMark } from '../../models/quizMarks.model';

@Injectable()
export class MarkQuizService implements OnInit {
  quiz: Quiz;
  questions: Question[];
  correctQuestions: Question[] = new Array();
  correctQuestionIds: number[] = new Array();
  incorrectQuestions: Question[] = new Array();
  student: any;
  answers: Answer[];
  marks: number;
  quizMark: QuizMark = new QuizMark();



  constructor() { }

  ngOnInit() {
    this.setStudent();
  }

  setStudent() {
    this.student = {
      id: 1
    }
  }

  setQuiz(quiz: Quiz) {
    this.quiz = quiz;
  }

  setQuestions(questions: Question[]) {
    this.questions = questions;
  }

  setCorrectquestions(correctQuestions: Question[]) {
    this.correctQuestions = correctQuestions;
  }

  setAnswers(answers: Answer[]) {
    this.answers = answers;
  }

  submitQuiz(quiz: Quiz, answers: Answer[]) {
    this.setStudent();
    this.setQuiz(quiz);
    this.setQuestions(quiz.questions);
    this.setAnswers(answers);
  }

  markQuiz() {
    let answeredQuestion: Question;
    let correctCount: number = 0;
    console.log('student',this.student);
    this.answers.forEach(answer => {
      answeredQuestion = this.getQuestionById(answer.question);
      if (answer.selectedAnswer === answeredQuestion.correctAnswer) {
        this.correctQuestions.push(answeredQuestion);
        this.correctQuestionIds.push(answeredQuestion.queId);
        correctCount++;
      } else {
        this.incorrectQuestions.push(answeredQuestion);
      }
      this.marks = this.calculateMarks(correctCount);
    });
  }

  getQuestionById(questionId: number) {
    let index = this.questions.findIndex(result => result.queId === questionId);
    return this.questions[index];
  }

  calculateMarks(correctCount) {
    return correctCount * 1;
  }

  setStudentMark() {
    this.quizMark.quiz = this.quiz.qId;
    this.quizMark.student = this.student.id;
    this.quizMark.correctQuestions = this.correctQuestionIds;
    this.quizMark.marks = this.marks;
  }

  getStudentMark() {
    return this.quizMark;
  }
}
