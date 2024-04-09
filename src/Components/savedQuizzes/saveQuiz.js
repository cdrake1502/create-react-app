import Cookies from 'js-cookie'; // Assuming you've installed js-cookie
// this probably wont work 
export function saveQuizData(quizName, quizString) {
  const stringifiedData = JSON.stringify(quizString);
  const expirationDays = 30; // Adjust expiration time as needed (e.g., 7 days)
  Cookies.set(quizName, stringifiedData, { expires: expirationDays });
  alert(`Quiz "${quizName}" saved (data in cookie)!`); // Informative message
}
