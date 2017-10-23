export const backend =  {
    baseUrl: 'http://localhost:8080/',
    apiSuffix: {
        quiz: 'quizzes/',
        quizMark: 'quizmarks'
    }
}

export let generateUrl =(suffix) => {
    return backend.baseUrl+backend.apiSuffix[suffix];
}

export const generateQuizUrl = (id) => {
    return backend.baseUrl+backend.apiSuffix.quiz+'/'+id;
}

export const generateQuizMarksUrl = (id) => {
    return backend.baseUrl+backend.apiSuffix.quizMark+'/';
}