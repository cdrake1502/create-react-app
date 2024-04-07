export function getLoginState() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    let user = null;
    if (isLoggedIn) {
      try {
        user = JSON.parse(sessionStorage.getItem('user'));
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    }
    return { isLoggedIn, user };
  }