import React from 'react';
import './splash_global.css';
import './splash_index.css';
import Logo from "./logo.png";



const Splash = () =>{


  return(
  <body>
    <div class="temp-splash">

          <div className="container">
        
          </div>
      <img class="rectangle-temp-icon" src={Logo} alt="Logo"/>
    </div>
  </body>
  );
};

export default Splash;
