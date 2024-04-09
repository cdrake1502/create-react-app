import React, { useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Logo from './logo.png';
import "./Navbar.css";
import {getLoginState} from "../authenticate/getLoginState"; 
import {setLoginState} from "../authenticate/setLoginState";

const Navbar = ({onLogout }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  


  const handleLogin = () => {
    navigate('/login');
    //setIsLoggedIn(true);
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    // Implement your logout logic and update isLoggedIn
    setLoginState(false);
    onLogout();
    navigate('/splash');
  };
  const handleQuzGen = () => {
    navigate('/QuizGen');
  }
  const handleHome = () =>{
    navigate('/splash');
  }
  const handleDisplaySaved = () =>{
    navigate('/displayquizzes');
  }


 
  return (
    <div className="navbar-container fixed-top z-10 flex items-center justify-between px-4 bg-gray-800 text-white">
      <div className="navbar-image">
        {/* Replace with your image component or source */}
        <img src={Logo} alt="Navbar logo" />
      </div>
      <div className="center-nav">
        <button className="Home-Button" onClick={handleHome}>Home</button>
         
      </div>
      <nav className="navbar-links flex">
     
            {getLoginState().isLoggedIn ?(
              <div>
                <p className='userName'>{getLoginState().user}</p>  
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleDisplaySaved}> Saved</button>
                  {pathname !== '/QuizGen' && (
                    <button onClick={handleQuzGen}> QuizGen</button>
                  )}
              </div>
            ):(
              <div>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleSignup}>Sign Up</button>
              </div>
             
            )
            }
    

      </nav>
    </div>
  );
};

export default Navbar;