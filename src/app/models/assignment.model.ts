export class Assignment {
    assignId : number;
    name: String;
    description: string = '';
    startDate: Date;
    endDate: Date;
    courseId: number;
    file: String;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }