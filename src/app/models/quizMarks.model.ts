export class QuizMark {
    quiz: number;
    student: number;
    marks: number;
    correctQuestions: number[];

    constructor(value: Object={}) {
        Object.assign(this,value);
    }
}