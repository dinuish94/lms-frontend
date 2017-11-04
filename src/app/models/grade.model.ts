export class Grade {
    assignId: number;
    studentId: number;
    marks : number;
    feedback: string;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}