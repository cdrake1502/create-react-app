import React, { useState, useEffect } from 'react';
import { getLoginState } from '../authenticate/getLoginState';
import { createClient} from '@supabase/supabase-js';
import {getQuizzes} from '../apiresponse/getQuizzes';



const supabaseUrl = 'https://vyvojvrtkryvbsmcgzrq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dm9qdnJ0a3J5dmJzbWNnenJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2OTczNjYsImV4cCI6MjAyMzI3MzM2Nn0.g0vq8MRsOox8wKVEq8gde9CA_2egvpfMfoqDHiWJxv4';
const supabase = createClient(supabaseUrl, supabaseKey); 


const DisplayQuiz = () => {
  
  /*
  const display=()=>{
   
    addLink(userid)
    .then(quizzes => {
      // You can access the retrieved quizzes array here (optional)
      console.log('Quizzes:', quizzes);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  */
const user = getLoginState().UserID;
console.log(user);
  
  
  const addLink = async () =>{
    try {
        const {data: quizzes, error}= await supabase.from('quizzes')
            .select('*')
            .eq("user_id", user);
  
            if (error) {
                console.error('Error adding quizzes:', error);
                return; // Handle error appropriately
                
            }else if (quizzes.length === 0) {
                console.log('No quizzes found for this user.'); // Inform user if no quizzes exist
            } else {
                    for (const quiz of quizzes) {
                      // Create and customize your display elements here
                     console.log(quiz.quiz_name);
                      // Add event listeners or other functionality for individual quizzes as needed
                    }
                  }

  
                } catch (error) {
            console.error('Error getting Quizzes:', error.message);
            return { success: false, error: 'An error occurred while authenticating user' };
          }
    }
    
  return (
    <div>
     <p>
      <ul>
        
      </ul>
     </p>
     
      <button onClick={addLink} >display quizzes</button>
     
      
      
    </div>
  );
};

export default DisplayQuiz;