export class Quiz {
    course: number;
    name: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}