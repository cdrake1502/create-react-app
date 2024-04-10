export function setQuizzes(key, value) {
  try {
    // Convert the object or array to a JSON string
    const stringifiedValue = JSON.stringify(value);

    // Store the string in session storage
    sessionStorage.setItem(key, stringifiedValue);
  } catch (error) {
    console.error(`Error setting string state for key '${key}':`, error);
  }
}