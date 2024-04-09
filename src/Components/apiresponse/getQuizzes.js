export function getQuizzes() {
    const Response = sessionStorage.getItem('Quizzes');
    return {Response};
  }