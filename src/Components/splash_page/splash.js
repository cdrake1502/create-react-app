import React from 'react';
import './splash_global.css';
import './splash_index.css';
import Logo from "./logo.png";



const Splash = () =>{

  // const navigateToSignUp = () => {
  //   window.location.href = '/signup'
  // };
  // const navigateToLogin = () => {
  //   window.location.href = '/login'
  // };
  // const navigateToNotePage = () => {
  //   window.location.href = "/notepage"
  // }
  

  return(
  <body className="body">
    <div class="temp-splash">

          <div className="container">
            <div className="top-right-box">
              

              
             
            </div>
          </div>
      <img class="rectangle-temp-icon" src={Logo} alt="Logo"/>
    </div>
  </body>
  );
};

export default Splash;
