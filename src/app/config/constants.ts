export const backend =  {
    baseUrl: 'http://localhost:8080/',
    apiSuffix: {
        quiz: 'quizzes'
    }
}

export let generateUrl =(suffix) => {
    return backend.baseUrl+backend.apiSuffix[suffix];
}

export const generateQuizUrl = () => {
    return backend.baseUrl+backend.apiSuffix.quiz;
}