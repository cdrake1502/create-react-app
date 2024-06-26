import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './login_global.css';
import './login_index.css';
import Logo from './logo.png';
import { createClient } from '@supabase/supabase-js';
//import { getLoginState } from '../authenticate/getLoginState';
import {setLoginState} from '../authenticate/setLoginState';

const supabase = createClient('https://vyvojvrtkryvbsmcgzrq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dm9qdnJ0a3J5dmJzbWNnenJxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzY5NzM2NiwiZXhwIjoyMDIzMjczMzY2fQ.PzXtntpiXdhHH0lMh0EgPLFU1sYm4piufRkM6k2fkq4');

const Login = ({onLogin}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const result = await handleLogin(username, password);
    if (!result.success) {
      setError("Invalid username or password.");
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const { data: users, error } = await supabase
        .from('login')
        .select('*')
        .eq('username', username)
        .single();
  
      if (error) {
        throw error;
      }
  
      if (users && users.password === password) {
         const user= users.user_id; // Access the user_id from the data object
        setLoginState(true, username, user);
        onLogin(true);
        navigate('/quizgen');
        return { success: true, user: users };
      } else {
        return { success: false, error: alert("Invalid Username or Password.") };
      }
    } catch (error) {
      console.error('Error authenticating user:', error.message);
      return { success: false, error: alert("Invalid Username or Password.") };
    }
  };

  const navigateToSignUp = () => {
    navigate('/signup');
  };
  




  return (
    <form id="Login" onSubmit={handleSubmit}>
      <div className="login">
        <div className="login-child"></div>
        <div className="wrapper">
          <img className="icon" alt="" src={Logo} />
        </div>
        <div className="root-frame">
          <div className="input-frame">
            <div className="input-frame-child"></div>
            <h1 className="login1">LOGIN</h1>
            <div className="divider-frame-parent">
              <div className="divider-frame">
                <div className="username-input">
                  <div className="username-input-child"></div>
                  <input
                    className="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="login-button">
                  <div className="login-button-child"></div>
                  <input
                    className="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
             
              </div>
              <div className="divider-frame1">
                <button type="submit" className="rectangle-parent">
                  <div className="frame-child"></div>
                  <div className="login2" id="lOGINText">LOGIN</div>
                </button>
                <button className="rectangle-parent" onClick={navigateToSignUp}>
                  <div className="frame-item"></div>
                  <div className="sign-up2" id="sIGNUPText">SIGN UP</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};


export default Login;