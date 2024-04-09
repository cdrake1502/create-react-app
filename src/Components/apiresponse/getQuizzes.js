export function getResponseState() {
    const Response = sessionStorage.getItem('Quizzes');
    return {Response};
  }