import react, { useState}from 'react';
import './quizview.css';
import CopyQuiz from './copyquiz';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import {getResponseState} from "../apiresponse/getResponseState";
import {saveQuizData} from "../savedQuizzes/saveQuiz";
import { createClient } from '@supabase/supabase-js';
import { getLoginState } from '../authenticate/getLoginState';

const supabase = createClient('https://vyvojvrtkryvbsmcgzrq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dm9qdnJ0a3J5dmJzbWNnenJxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzY5NzM2NiwiZXhwIjoyMDIzMjczMzY2fQ.PzXtntpiXdhHH0lMh0EgPLFU1sYm4piufRkM6k2fkq4');




const QuizView = () => {
    
    const navigate = useNavigate();
    const [textBoxValue, setTextBoxValue] = useState(getResponseState().Response);
        const generatePDF = () => {
            const doc = new jsPDF();
            doc.text(textBoxValue, 10, 10,  { autoPrint: true });
            doc.save('quiz.pdf');
        };
        
    

        const handleBack = () => {
            navigate('/quizgen');
          };


//-------------------------------------------- get saved Quizzes -------------------------------
          const saveQuiz = async (e) =>{
            const quizData = document.getElementById("text-box").value;
            const user_id = getLoginState().user_id;
            
            e.preventDefault();
            const result = await getDbInfo(user_id, quizData);

          };

          const getDbInfo = async (user_id, quiz) =>{
            const { data, error } = await supabase
            .from('quizzes')
            .select('quizzes.name') // Select only quiz name
            .innerJoin('ownedquizzes', 'ownedquizzes.quiz_id', 'quizzes.quiz_id') // Join tables
            .eq('ownedquizzes.user_id', user_id) // Filter by user ID
        
          if (error) {
            console.error('Error fetching user quizzes:', error);
            return []; // Return empty array if error occurs
          }
          const returnedData = data.map(quiz => quiz.name);
          console.log(returnedData);
          return returnedData; // Extract and return only quiz names
          }
  //-------------------------------------------- get saved Quizzes -------------------------------
         
       
    
    //for copying the text -------------------------------------------------------//
    let [textToCopy, setTextToCopy] = useState('');

    const handleTextAreaChange = (event) => {
        setTextBoxValue(event.target.value);
        textToCopy = document.getElementById("text-box");
        setTextToCopy(event.target.value);
      };
    const { copied, copyToClipboard } = CopyQuiz(textToCopy);
    //for copying the text -------------------------------------------------------//
    
    return(
       
        <div className="container2">
            <h1 className="main-heading">Generated Quiz</h1>
            <div className="text-container">
                <textarea
                className='text-box2'
                id="text-box"
                value={textBoxValue}
                onChange={handleTextAreaChange}
                >
                    {textToCopy} 
                </textarea>

                <button id="copy-button" onClick={copyToClipboard}>{copied ? 'Copied!' : 'Copy'}</button>
            </div>
            <div className="button-container2">
                    <button className="saveButton"onClick={saveQuiz}>
                        Save
                        </button>

                      

                    <button onClick={generatePDF}>
                        Get PDF</button>
                    <button onClick={handleBack}>
                        Back</button>
                </div>
               

       
      </div>
      
    );
};

export default QuizView;
