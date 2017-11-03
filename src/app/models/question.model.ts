export class Question {
    queId: number;
    question: string;
    answers: string[];
    correctAnswer: string;
    flagged: boolean = false;
    selectedAnswer='';

    constructor(values: Object={}) {
        Object.assign(this,values);
    }
}