import React, { useState } from 'react';
import Logo from './logo.png';
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleLogin = () => {
    // Implement your login logic and update isLoggedIn
    setIsLoggedIn(true); // Example update (replace with actual auth check)
  };

  const handleSignup = () => {
    // Implement your signup logic
  };

  const handleLogout = () => {
    // Implement your logout logic and update isLoggedIn
    setIsLoggedIn(false); // Example update (replace with actual auth check)
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