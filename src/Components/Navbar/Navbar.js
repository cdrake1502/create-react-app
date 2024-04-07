import React, { useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Logo from './logo.png';
import "./Navbar.css";
import {getLoginState} from "../authenticate/getLoginState"; 
import {setLoginState} from "../authenticate/setLoginState";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const[isLoggedIn] = useState(getLoginState().isLoggedIn);
  const { pathname } = useLocation();
  console.log(pathname);


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
  const testButton = () =>{
    alert(getLoginState().user);
  };

 
  return (
    <div className="navbar-container fixed-top z-10 flex items-center justify-between px-4 bg-gray-800 text-white">
      <div className="navbar-image">
        {/* Replace with your image component or source */}
        <img src={Logo} alt="Navbar logo" />
      </div>
      <div className="center-nav">
        <button className="Home-button" onClick={handleHome}>Home</button>
        {console.log(getLoginState())}
         
      </div>
      <nav className="navbar-links flex">
     
            {getLoginState().isLoggedIn ?(
              <div>
                 
                    <button className='userName'>{getLoginState().user}</button>
                  
               <button onClick={handleLogout}>Logout</button>
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