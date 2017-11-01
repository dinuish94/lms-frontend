import { Question } from './question.model';

export class AnsweredQuestion {
     question: any;
     selectedAnswer: string;

     constructor(value:Object={}) {
         Object.assign(this,value);
     }
}