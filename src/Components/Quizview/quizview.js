import react, { useState, useEffect}from 'react';
import './quizview.css';
import CopyQuiz from './copyquiz';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import {getResponseState} from "../apiresponse/getResponseState";
import { createClient} from '@supabase/supabase-js';
import { getLoginState } from '../authenticate/getLoginState';




const supabase = createClient('https://vyvojvrtkryvbsmcgzrq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dm9qdnJ0a3J5dmJzbWNnenJxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzY5NzM2NiwiZXhwIjoyMDIzMjczMzY2fQ.PzXtntpiXdhHH0lMh0EgPLFU1sYm4piufRkM6k2fkq4');




const QuizView = () => {
    const [savePress, setSavePress] = useState(false);
    //const [Quizzes, setQuizzes] = useState([]); // Array to store quiz data
    const [selectedQuiz, setSelectedQuiz] = useState(null); // Track selected quiz (optional, for content display)
  
    const newValue = "null";
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
            const newName = document.getElementById("newQuizName");
            const quizContent = textBoxValue;
            const user = getLoginState().user_id;
         
           const {data, error}= await supabase.from('quizzes').insert([
            {
                quiz_name: newName,
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
        console.log("Generation Successful");
        
        setSavePress(true);
        
            let count = 0;
            const quiznames = [];
            for (const quiz of quizzes) {
             


            }
            
           
            //setQuizzesUse(quiznames);
            displayquizzes(quizzes,"display-names");
           

          
        
    }
  }
/*
    useEffect(() => {
        const saveButton= async () => {
            setSavePress(true)
            const user = getLoginState().user_id;
          const { data, error } = await supabase
            .from('quizzes') // Replace with your table name
            .select('*')
            .eq('user_id', user);
      
          if (error) {
            console.error('Error fetching quizzes:', error);
            return; // Handle error appropriately0
          }
      
          setQuizzes(data); // Update state with fetched quizzes
          
          console.log(data.at(0).user_id);

        };
      
        saveButton();
      }, []); // Run only on component mount
  
  */
    
    
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
      let count = 0;
        for (const item of array) {
            
          quizArray.push(item.content); //push content to array 
          const baseItem = document.createElement("div");
          baseItem.id = 'quiz-${count}'; //push id to each div
          console.log("id: " + count);
          
          const buttonItem = document.createElement("button");
          buttonItem.textContent = item.quiz_name; // Set the content of the list item
          buttonItem.addEventListener("click", () => {
            // Log the content of the clicked quiz to the console
            console.log(item.name);
            setTextBoxValue(item.content);
            //setTextBoxValue(item.content);
        });

          baseItem.appendChild(buttonItem);
          listElement.appendChild(baseItem);
          count++;
        }
        containerElement.innerHTML = "";


        // Append the list to the container element
        containerElement.appendChild(listElement);
}   
const quizArray = [];
const onclickItem = (count) =>{
    const quiz = "";
    if (quizArray === null) {
        
    }else {
        quiz = quizArray[count];

    }
    setTextBoxValue(quiz);

}

/* 
first function gets all quiz objects and displays the names 
so we save each quiz with its quiz id in an array array index is correlated to the displayed quizzes


const iterate =(Quizzes)=>{
  let i;

for ( i=0;i < Quizzes.length;i++){
  console.log(Quizzes.id);
}
}*/

    

    return(
       
        <div className="container2">
            <h1 className="main-heading">Generated Quiz</h1>
           

            <div className="text-container" >
          { savePress ?(
              
            <div id="display-names" className="display-names"> 
           
            </div>
          ):(<div> </div>)}
  
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
            { savePress ?(<div></div>):
            (<div>
                      <input type="text" 
                              className="quiz-nameBox" 
                              placeholder='Please enter name for Quiz'
                              id="newQuizName"
                              />
                        Name:
                 
             </div>
            )}
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
