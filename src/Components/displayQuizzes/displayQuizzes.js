import React, { useState, useEffect } from 'react';
import { getLoginState } from '../authenticate/getLoginState';
import { createClient} from '@supabase/supabase-js';
import {getQuizzes} from '../apiresponse/getQuizzes';


const supabase = createClient('https://vyvojvrtkryvbsmcgzrq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dm9qdnJ0a3J5dmJzbWNnenJxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzY5NzM2NiwiZXhwIjoyMDIzMjczMzY2fQ.PzXtntpiXdhHH0lMh0EgPLFU1sYm4piufRkM6k2fkq4');
const quizzes  = getQuizzes().Quizzes;
  console.log(quizzes.length);
const display=()=>{

}


function DisplayQuizzes() {
  
  return (
    <div>
     
     <h1>Saved Quizzes</h1>
     <ul>
     
      </ul>
      
    </div>
  );
}

export default DisplayQuizzes;