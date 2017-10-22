export class Quiz {
    course: number;
    name: string = '';
    qId:number;
    answers: String[];
    correctAnswer: String;
    question: String;
    duration: number;
    date: Date;
    active:boolean;

    constructor(values: Object = {}) {
        (<any>Object).assign(this, values);
    }

}