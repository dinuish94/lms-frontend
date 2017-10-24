import { Quiz } from '../quizDTO.model';
import { answeredQuestion } from '../answeredQuestion.model';

export class QuizMark1  {
    qmId: number;
    marks: number;
    quiz: Quiz;
    student: any;
    correctQuestions: answeredQuestion[];

    constructor(value:Object={}) {
        Object.assign(this,value);
    }
}