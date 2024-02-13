import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './signup_global.css';
import './signup_index.css';
import {createClient} from '@supabase/supabase-js';
const supabase = createClient('https://vyvojvrtkryvbsmcgzrq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dm9qdnJ0a3J5dmJzbWNnenJxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzY5NzM2NiwiZXhwIjoyMDIzMjczMzY2fQ.PzXtntpiXdhHH0lMh0EgPLFU1sYm4piufRkM6k2fkq4');




const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
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

      try {
          // Insert data into 'users' table
          const { data, error } = await supabase.from('login').insert([{ email, password }]);

          if (error) {
              console.error('Error inserting data:', error.message);
              setError('Error signing up. Please try again.');
          } else {
              console.log('Data inserted successfully:', data);
              // Redirect user to dashboard or display success message
          }
      } catch (error) {
          console.error('Error:', error.message);
          setError('Error signing up. Please try again.');
      }
  };

  return (
      <div className="sign-up">
          <form onSubmit={handleSubmit}>
              <div className="sign-up-box">
                  <h1 className="sign-up1">SIGN-UP</h1>
                  <div className="sign-up-text">
                      <input
                          className="rectangle-group1"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="Email Address"
                          required
                      />

                      <input
                          className="rectangle-group2"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          required
                      />

                      <button className="btn btn-secondary rounded-pill bottom-button">Sign Up</button>
                  </div>
              </div>
          </form>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
      </div>
  );
};

export default SignUp;
