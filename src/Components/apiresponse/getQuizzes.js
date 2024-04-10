export function getQuizzes(key) {
  try {
    // Get the string value from session storage
    const stringifiedValue = sessionStorage.getItem(key);
    if (stringifiedValue) {
      // Parse the JSON string back to an object or array
      return JSON.parse(stringifiedValue);
    } else {
      return null; // Indicate no data found
    }
  } catch (error) {
    console.error(`Error getting string state for key '${key}':`, error);
    return null; // Indicate error
  }
  }