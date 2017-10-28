import { Quiz } from '../quizDTO.model';
import { AnsweredQuestion } from '../answeredQuestion.model';

export class QuizMark1  {
    marks: number;
    quiz: any;
    student: any;
    answeredQuestions: AnsweredQuestion[];

    constructor(value:Object={}) {
        Object.assign(this,value);
    }
}