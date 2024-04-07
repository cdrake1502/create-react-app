



export function setLoginState(isLoggedIn, user) {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
    if (isLoggedIn) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }
