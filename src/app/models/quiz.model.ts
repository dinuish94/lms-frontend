export class Quiz {
    course: number;
    name: string = '';
    quizId:number;
    answers: String[];
    correctAnswer: String;
    question: String;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}