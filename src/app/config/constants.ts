export const backend =  {
    baseUrl: 'http://localhost:8080/',
    apiSuffix: {
        quiz: 'quizzes/',
        quizMark: 'quizmarks',
        student: 'students/'
    }
}

export let generateUrl =(suffix) => {
    return backend.baseUrl+backend.apiSuffix[suffix];
}

export const generateQuizUrl = (id) => {
    return backend.baseUrl+backend.apiSuffix.quiz+'/'+id;
}

export const generateQuizMarksUrl = (quizId: number,studentId: number) => {
    return backend.baseUrl+backend.apiSuffix.quiz+quizId+'/'+backend.apiSuffix.student+studentId+'/'+backend.apiSuffix.quizMark;
}