import { Course } from './course.model';
import { Assignment } from './assignment.model';

export class Student {
    sId: number;
    name: string = '';
    courses : Course[];
    studentAssignment : Assignment[];
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}