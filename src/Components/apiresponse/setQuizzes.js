export function setQuizzes(Quizzes) {
    sessionStorage.setItem('Quizzes', Quizzes);
    console.log(Quizzes.length);
  }