
export function setLoginState(isLoggedIn, user, user_id) {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
    sessionStorage.setItem('user-id', user_id);
    console.log(user_id);
    if (isLoggedIn) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }
