export class Course {
    // id: number;
    // name: string = '';
    cId : number;
    title : string = '';
    description : string = '';
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }