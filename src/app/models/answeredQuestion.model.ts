import { Question } from './question.model';

export class answeredQuestion {
     question: Question;
     selectedAnswer: string;

     constructor(value:Object={}) {
         Object.assign(this,value);
     }
}