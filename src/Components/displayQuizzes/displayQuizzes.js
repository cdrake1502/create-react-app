import React, { useState, useEffect } from 'react';
import { getLoginState } from '../authenticate/getLoginState';
import { createClient} from '@supabase/supabase-js';


const supabase = createClient('https://vyvojvrtkryvbsmcgzrq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dm9qdnJ0a3J5dmJzbWNnenJxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzY5NzM2NiwiZXhwIjoyMDIzMjczMzY2fQ.PzXtntpiXdhHH0lMh0EgPLFU1sYm4piufRkM6k2fkq4');


function DisplayQuizzes() {
  /*
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');


  const getQuizArray = async () =>{
   
    const result = await getFromDb();
    if (!result.success) {
      setError(result.error);
    }
  }

  const  getFromDb = async () => {
    //const userId = getLoginState().user_id;
    const userId = 11;

    if (!userId) {
      console.error('User ID not found in session');
      return; // Handle missing user ID (e.g., redirect to login)
    }
    try{

        const { data: users, error } = await supabase
            .from('ownedQuizzes')
            .select('*')
            .eq('user_id', userId)
            .then((result) => result.data) ;

            if (error) {
              throw error;
            }
            const quizData = users.data.map((ownedQuiz) => ownedQuiz.quizzes); // Extract the actual quizzes from the nested data
            setQuizzes(quizData.flat()); 
    }  catch (error) {
          console.error('Error authenticating user:', error.message);
          return { success: false, error: 'An error occurred while authenticating user' };
    }
    
    
    }
  
  
   
  const handleQuizClick = () =>{

  };

  useEffect(() => {
   getQuizArray();
  }, []);
*/
  return (
    <div>
     
     <h1>Saved Quizzes</h1>
     <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <button onClick={() => handleQuizClick(quiz)}>{quiz.name}</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default DisplayQuizzes;