import { Course } from './course.model';
import { Assignment } from './assignment.model';

export class Student {
    studentId: number;
    name: String;
    email: String;

    courses : Course[];
    studentAssignment : Assignment[];

    constructor(value: Object={}) {
        Object.assign(this,value);

    }
}