export class Feedback {
    fId : number;
    teacher : Teacher;
    name : string = '';
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }

  interface Teacher{
      name: String;
      id : number;
  }