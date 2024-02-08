import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Logo from './logo.png';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleLogin = () => {
    navigate('/login')
    //setIsLoggedIn(true); // Example update (replace with actual auth check)
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    // Implement your logout logic and update isLoggedIn
    //setIsLoggedIn(false); // Example update (replace with actual auth check)
    navigate('/splash')
  };
  
    const navigateToLogIn = () => {
      navigate('/quizgen');
    };

  return (
    <div className="navbar-container fixed-top z-10 flex items-center justify-between px-4 bg-gray-800 text-white">
      <div className="navbar-image">
        {/* Replace with your image component or source */}
        <img src={Logo} alt="Navbar logo" />
      </div>
      <nav className="navbar-links flex">
        {/* Conditionally render buttons based on login state */}
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            {/* Add other logged-in user options if needed */}
          </>
        ) : (
          <>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Sign Up</button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;