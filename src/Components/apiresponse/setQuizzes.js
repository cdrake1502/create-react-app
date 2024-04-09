export function setQuizzesState(Quizzes) {
    sessionStorage.setItem('Quizzes', Quizzes);
    console.log(Quizzes.length);
  }