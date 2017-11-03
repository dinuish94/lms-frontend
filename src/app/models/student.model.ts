export class Student {
    studentId: number;
    name: String;
    email: String;

    constructor(value: Object={}) {
        Object.assign(this,value);
    }
}