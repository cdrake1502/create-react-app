export function loadSavedQuizzes() {
    const savedQuizzes = {};
    const cookies = document.cookie.split(';');
  
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key.startsWith('quiz-')) { // Filter for quiz-related cookies
        try {
          savedQuizzes[key] = JSON.parse(value);
        } catch (error) {
          console.error('Error parsing saved quiz data:', error);
          // Handle parsing errors (e.g., remove invalid cookies)
        }
      }
    }
  
    return savedQuizzes;
  }