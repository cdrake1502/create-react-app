import react, { useState}from 'react';
import './quizview.css';
import CopyQuiz from './copyquiz';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import {getResponseState} from "../apiresponse/getResponseState";
import {saveQuizData} from "../savedQuizzes/saveQuiz";
import { createClient} from '@supabase/supabase-js';
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

//--------------------------------------for copying the text -------------------------------------------------------//
                let [textToCopy, setTextToCopy] = useState('');

                const handleTextAreaChange = (event) => {
                    setTextBoxValue(event.target.value);
                    textToCopy = document.getElementById("text-box");
                    
                    setTextToCopy(event.target.value);
                };
                const { copied, copyToClipboard } = CopyQuiz(textToCopy);
//----------------------------------------for copying the text -------------------------------------------------------//
    


//-------------------------------------------- insert saved Quizzes -------------------------------
          const saveQuiz = async (e) =>{
            const quizContent = textBoxValue;
            const user = getLoginState().user_id;
         console.log(user);
           const {data, error}= await supabase.from('quizzes').insert([
            {
                quiz_name:"it is what it is", 
                content: quizContent,
                user_id: user,
            },])


            if (error) {
                console.error('Error adding quiz:', error);
                return; // Handle error appropriately
              }
            
              console.log('Quiz added successfully:', data);
              const userid = getLoginState().user_id;
              addLink(userid)
              .then(quizzes => {
                // You can access the retrieved quizzes array here (optional)
                console.log('Quizzes:', quizzes);
              })
              .catch(error => {
                console.error('Error:', error);
              });
             

                

              

              //  const {data, error} = await supabase.from('')

        }
  //-------------------------------------------- insert saved Quizzes -------------------------------
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
                    console.log(quizzes.length);
                    for (const quiz of quizzes) {
                      
                    }}

                    } catch (error) {
                console.error('Error getting Quizzes:', error.message);
                return { success: false, error: 'An error occurred while authenticating user' };
              }
        }
    

       
    
 
    const testButton =() =>{
        alert(getLoginState().user_id);
    }

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

                        <button onClick={testButton}>test button </button>

                    <button onClick={generatePDF}>
                        Get PDF</button>
                    <button onClick={handleBack}>
                        Back</button>
                </div>
               

       
      </div>
      
    );
};

export default QuizView;
