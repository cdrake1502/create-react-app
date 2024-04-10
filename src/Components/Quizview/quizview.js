import react, { useState}from 'react';
import './quizview.css';
import CopyQuiz from './copyquiz';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import {getResponseState} from "../apiresponse/getResponseState";
import { createClient} from '@supabase/supabase-js';
import { getLoginState } from '../authenticate/getLoginState';




const supabase = createClient('https://vyvojvrtkryvbsmcgzrq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dm9qdnJ0a3J5dmJzbWNnenJxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzY5NzM2NiwiZXhwIjoyMDIzMjczMzY2fQ.PzXtntpiXdhHH0lMh0EgPLFU1sYm4piufRkM6k2fkq4');




const QuizView = () => {
    const [quizzesUse, setQuizzesUse] = useState([]);
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
          const handleDisplaySaved = () =>{
            navigate('/display');
          }

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
              
                addLink(user)
                .then(quizzes => {
                // You can access the retrieved quizzes array here (optional)
                console.log('Quizzes:', quizzes);
                })
                .catch(error => {
                console.error('Error:', error);
                });
              //navigate('/display');
              
 
              //  const {data, error} = await supabase.from('')

        }
  //-------------------------------------------- insert saved Quizzes -------------------------------
  const addLink= async (user) =>{
    

    const {data: quizzes, error}= await supabase.from('quizzes')
    .select('*')
    .eq("user_id", user);

    if (error) {
        console.error('Error adding quizzes:', error);
        return; // Handle error appropriately
        
    }else if (quizzes.length === 0) {
        quizzes.textContent = ('No quizzes found for this user.'); // Inform user if no quizzes exist
    } else {
            let count = 0;
            const quiznames = [];
            for (const quiz of quizzes) {
                count++;
               // console.log(quiz.quiz_name, quiz.id);
                quiznames.push(quiz.quiz_name);


            }
            setQuizzesUse(quiznames);
            displayquizzes(quizzes,"display-names");
           

          
        
    }
  
    }
    const displayquizzes =(array, containerId)=>{
        if (!Array.isArray(array)) {
            console.error("Error: displayArrayInList requires an array as input.");
            return;
          }
        
          const containerElement = document.getElementById(containerId);
          if (!containerElement) {
            console.error("Error: Container element with ID", containerId, "not found.");
            return;
          }
        const listElement = document.createElement("ul");

        // Loop through the array and create list items
        
        for (const item of array) {
            console.log(item.user_id);
          const listItem = document.createElement("li");
          listItem.textContent = item.quiz_name; // Set the content of the list item
          const ListButton = document.createElement("button");
          ListButton.textContent= "show Quiz";
          ListButton.onClick= console.log(item.id)
          listElement.appendChild(listItem);
        }
        containerElement.innerHTML = "";

        // Append the list to the container element
        containerElement.appendChild(listElement);
}   
    

    return(
       
        <div className="container2">
            <h1 className="main-heading">Generated Quiz</h1>
            <div id="display-names" className="display-names">

            </div>

            <div className="text-container" >
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
