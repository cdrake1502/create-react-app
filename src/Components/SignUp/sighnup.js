import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './signup_global.css';
import './signup_index.css';


const SignUp =() =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Regular expressions for password complexity
      const numberRegex = /\d/;
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]/;
  
      // Perform validation checks
      if (
        !email.includes('@') ||
        password.length < 6 ||
        !numberRegex.test(password) ||
        !uppercaseRegex.test(password) ||
        !lowercaseRegex.test(password) ||
        !specialCharRegex.test(password)
      ) {
        setError(
          'Password must be at least 6 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character.'
        );
        return;
      }
  
      // Clear any existing errors
      setError('');
  
      // Proceed with sign-in logic
    };
  

  return(
          <div class="sign-up">

            <form onSubmit={handleSubmit}>
              <div class="sign-up-box">
                <h1 class="sign-up1">SIGN-UP</h1>
                    <div class="sign-up-text">
                      <div class="input-rectangle"></div>
                      <input class="rectangle-group" type="text" placeholder="Confirm Password"/>

                      <input class="rectangle-group1" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      type="email" 
                      placeholder="Email Address" required/>

                      <input 
                      class="rectangle-group2" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="Password" required/>

                      <input class="rectangle-group3" type="text" placeholder="Last Name"/>

                      <input class="sign-up-text-child" type="text" placeholder="First Name"/>
                    </div>
              </div>
          <div className="container">
            <button className="btn btn-secondary rounded-pill bottom-button">Sign Up</button>
          </div>
            </form>
            {error && (<div className="alert alert-danger" role="alert"> {error}


          </div>
            )}
      </div>
      
  );
};

export default SignUp;
