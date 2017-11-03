export class Submission {
    studentId: number;
    file: string = '';
    studentName : String;
    marks: number;
    feedback: string;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}