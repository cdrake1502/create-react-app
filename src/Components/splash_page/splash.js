import React from 'react';
import './splash_global.css';
import './splash_index.css';
import Logo from "./logo.png";



const Splash = () =>{
  return(
  <body className="body">
    
    <div className="wrapper">
            <img className="icon" alt="" src={Logo} />
          </div>
  </body>
  );
};

export default Splash;
