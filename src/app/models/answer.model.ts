export class Answer { 
    question: number;
    selectedAnswer: string;

    constructor(question,selectedAnswer) {
        this.question = question;
        this.selectedAnswer = selectedAnswer;
    }
}