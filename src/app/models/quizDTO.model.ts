import { Question } from './question.model';
export interface Quiz {
    course: any;
    name: string;
    qId: number;
    questions: Question[];
}
