export function getLoginState() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const user_id = sessionStorage.getItem('user_id');
    let user = null;
    if (isLoggedIn) {
      try {
        user = JSON.parse(sessionStorage.getItem('user'));

      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    }
    return { isLoggedIn, user, user_id };
  }