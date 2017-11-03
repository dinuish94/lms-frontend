import { Question } from './question.model';
export class Quiz {
    course: number;
    name: string;
    qId:number;
    answers: String[];
    correctAnswer: String;
    question: String;
    questions: Question[];
    duration: number;
    date: Date;
    active:boolean;

    constructor(values: Object = {}) {
        (Object).assign(this, values);
    }

    printQuestions() {
        console.log(this.questions);
    }

}