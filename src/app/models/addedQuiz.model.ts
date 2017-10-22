import { Quiz } from '../models/quiz.model';

export class AddedQuiz {
    name: string = '';
    qId:number;
    // answers: String[];
    // correctAnswer: String;
    questions: Quiz[];
    date: Date;
    duration: number;
    active: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}