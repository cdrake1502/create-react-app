import React, { useState, useEffect } from 'react';
import { getLoginState } from '../authenticate/getLoginState';
import { createClient} from '@supabase/supabase-js';
//import {getQuizzes} from '../apiresponse/getQuizzes';


const supabase = createClient('https://vyvojvrtkryvbsmcgzrq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dm9qdnJ0a3J5dmJzbWNnenJxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzY5NzM2NiwiZXhwIjoyMDIzMjczMzY2fQ.PzXtntpiXdhHH0lMh0EgPLFU1sYm4piufRkM6k2fkq4');

 
const display=()=>{
  const userid = getLoginState().user_id;
  addLink(userid)
  .then(quizzes => {
    // You can access the retrieved quizzes array here (optional)
    console.log('Quizzes:', quizzes);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

const addLink = async (user) =>{
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
              let Count = 0;
              const quizList = document.getElementById('quiz-list');
              quizList.innerHTML = ''; 

              for (const quiz of quizzes) {
                if (quizzes.length === 0) {
                  quizList.textContent = 'No quizzes found for this user.'; // Inform user if no quizzes exist
                } else {
                  for (const quiz of quizzes) {
                    // Create and customize your display elements here
                    const quizElement = document.createElement('li'); // Example element
                    quizElement.textContent = quiz.quiz_name; // Example: Display quiz name
                    quizList.appendChild(quizElement);
              
                    // Add event listeners or other functionality for individual quizzes as needed
                  }
                }
                
                const newq =("<li>" + quiz.quiz_name+ "</li>");
                
              }}

              } catch (error) {
          console.error('Error getting Quizzes:', error.message);
          return { success: false, error: 'An error occurred while authenticating user' };
        }
  }


function DisplayQuizzes() {
  
  return (
    <div>
     
     <h1>Saved Quizzes</h1>
     <ul id="quiz-list">
      
     
      </ul>
      
    </div>
  );
}

export default DisplayQuizzes;