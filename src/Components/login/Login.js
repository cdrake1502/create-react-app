import React from 'react';
import {useNavigate} from 'react-router-dom';
import './login_global.css';
import './login_index.css';
import Logo from './logo.png';
import {createClient} from '@supabase/supabase-js';
const supabase = createClient('https://vyvojvrtkryvbsmcgzrq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dm9qdnJ0a3J5dmJzbWNnenJxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzY5NzM2NiwiZXhwIjoyMDIzMjczMzY2fQ.PzXtntpiXdhHH0lMh0EgPLFU1sYm4piufRkM6k2fkq4');


const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
  
    // const navigateToSignUp = () => {
    //   navigate('/signup');
    // };
    // const navigateToQuizGen = () => {
    //   navigate('/quizgen');
    // };

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const {user, session, error} = await supabase.auth.signIn({username, password});
        if (error) {
          throw error;
        }
        console.log('User: ', user);
        navigate('/quizgen.js')
      } catch (error) {
        console.error('Login error: ', error.message);
        setError('Invalid username or password. Try again.');
      }
      };
      const navigateToSignUp = () => {
        navigate('/signup');
      };
    
  
    
  return(
  <form id="Login">
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
                    <input className="username" type="text" placeholder="Username"/>
                  </div>
                  <div className="login-button">
                    <div className="login-button-child"></div>
                    <input className="password" type="text" placeholder="Password"/>
                  </div>
                </div>
                <div className="divider-frame1">
                  <button className="rectangle-parent">
                    <div className="frame-child"></div>
                    <div onClick={navigateToQuizGen} className="login2" id="lOGINText">LOGIN</div>
                  </button>   
                  <button className="rectangle-parent">
                    <div className="frame-item"></div>
                    <div onClick={navigateToSignUp} className="sign-up2" id="sIGNUPText">SIGN UP</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>  
    </form>

  );
};

export default Login;
