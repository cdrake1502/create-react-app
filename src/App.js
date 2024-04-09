import React, {useState} from'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Components/login/Login';
import SignUp from './Components/SignUp/sighnup';
import Splash from './Components/splash_page/splash';
import QuizGen from './Components/QuizGeneration/QuizGen';
import QuizView from './Components/Quizview/quizview';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import {createClient} from '@supabase/supabase-js';
import { setLoginState} from './Components/authenticate/setLoginState'; // Import functions from auth.js
import {getLoginState } from './Components/authenticate/getLoginState';
import DisplayQuizzes from './Components/displayQuizzes/displayQuizzes';



const supabaseUrl = 'https://vyvojvrtkryvbsmcgzrq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dm9qdnJ0a3J5dmJzbWNnenJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2OTczNjYsImV4cCI6MjAyMzI3MzM2Nn0.g0vq8MRsOox8wKVEq8gde9CA_2egvpfMfoqDHiWJxv4';
const supabase = createClient(supabaseUrl, supabaseKey); 












function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(getLoginState().isLoggedIn); // Initial state from storage
  const [user, setUser] = useState(getLoginState().user); // Optional: store user data
 
  


  const handleLogin = (loggedIn) =>{
    setIsLoggedIn(loggedIn);
    console.log(isLoggedIn);
    console.log(user);
  };

  const handleLogout = () => {
    setLoginState(false);
    setIsLoggedIn(false); // Update state for immediate UI change
  };




  return (
   
    <div className="App">
      <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout}/>
      
            <Routes>
                  <Route path='/' element={<Splash/>}/>
                  <Route path='/splash' element={<Splash/>}/>
                  <Route path='/signup' element={<SignUp onSignUp = {handleLogin}/>} />
                  <Route path="/login" element = {<Login onLogin = {handleLogin}/>} />
                  <Route path="/quizgen" element = {<QuizGen />} />
                  <Route path="/quizview" element = {<QuizView />} />
                  <Route path="/quizview" element = {<DisplayQuizzes/>} />

            </Routes>
       <Footer/>
      </BrowserRouter>
    </div>
    

  );
}

export default App;