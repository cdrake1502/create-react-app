import React from 'react';
import './splash_global.css';
import './splash_index.css';
import Logo from "./logo.png";



const Splash = () =>{

  const navigateToSignUp = () => {
    window.location.href = '/signup'
  };
  const navigateToLogin = () => {
    window.location.href = '/login'
  };
  const navigateToNotePage = () => {
    window.location.href = "/notepage"
  }
  

  return(
  <body className="body">
    <div class="temp-splash">

          <div className="container">
            <div className="top-right-box">
              
              <button className="su_btn btn-secondary rounded-pill" onClick={navigateToSignUp}>Sign Up</button>
              <button className="l_btn btn-secondary rounded-pill" onClick={navigateToLogin}>Login</button>
              <button className="np_btn btn-secondary rounded-pill" onClick={navigateToNotePage}>Note Page</button>
              
             
            </div>
          </div>
      <img class="rectangle-temp-icon" src={Logo} alt="Logo"/>
    </div>
  </body>
  );
};

export default Splash;
