export class Question {
    queId: number;
    question: string;
    answers: string[];
    correctAnswer: string;

    constructor(values: Object={}) {
        Object.assign(this,values);
    }
}