import { Quiz } from '../models/quiz.model';

export class AddedQuiz {
    name: string = '';
    qId:number;
    answers: String[];
    correctAnswer: String;
    question: Quiz[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}