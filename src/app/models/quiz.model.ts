export class Quiz {
    course: number;
    name: string = '';
    qId:number;
    answers: String[];
    correctAnswer: String;
    question: String;

    constructor(values: Object = {}) {
        (<any>Object).assign(this, values);
    }

}