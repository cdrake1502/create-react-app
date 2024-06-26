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
    const [quizName, setNameQuiz] = useState("");
    const [selectedQuiz, setSelectedQuiz] = useState(null); // Track selected quiz (optional, for content display)
  
  
    const newValue = "null";
    const navigate = useNavigate();

    const [textBoxValue, setTextBoxValue] = useState(getResponseState().Response);
    const generatePDF = () => {
      const contentWidth = measureContentWidth(textBoxValue); 
      const contentHeight = measureContentHeight(textBoxValue); 
      
      const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'pt',
          format: [contentWidth + 50, contentHeight + 50] 
      });
      
      doc.text(textBoxValue, 25, 25);
      doc.autoPrint({variant: 'non-conform'});
      doc.save('quiz.pdf');
  };
  

  const measureContentWidth = (content) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = '12px Arial'; 
      return context.measureText(content).width; 
  };
  

  const measureContentHeight = (content) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = '12px Arial'; 
      const lineHeight = 16; 
      const lines = content.split('\n'); 
      return lines.length * lineHeight; 
  };
  
  
        
    

        const handleBack = () => {
            navigate('/quizgen');
          };
          const handleDisplaySaved = () =>{
            navigate('/display');
          }

//--------------------------------------for copying the text -------------------------------------------------------//
//let [textToCopy, setTextToCopy] = useState('');
const [copied, setCopied]= useState(false);

    /*const handleTextAreaChange = (event) => {
        
        setTextToCopy(event.target.value);
        
      };
      */
    const callCopy = () =>{
      const textElement = document.getElementById("text-box");
      const text = textElement.value;
      console.log(text)
      CopyIt()
      const CopyIt = async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 3000); // Optional: Show copied message for 1 second
        } catch (err) {
          console.error('Failed to copy text:', err);
        }
      };
      if(copied === true){
      console.log("copied: is good");
      }
    }
    



   

/*
                let [textToCopy, setTextToCopy] = useState('');
                

                const handleTextAreaChange = async (event) => {
                    setTextBoxValue(event.target.value);
                    textToCopy = document.getElementById("text-box2");
                    setTextToCopy(event.target.value);
                    setCopied(true);
                };

                const copyToClipboard = () =>{
                  handleTextAreaChange();
                  navigator.clipboard.writeText(textToCopy);
                }
        */        
//----------------------------------------for copying the text -------------------------------------------------------//
    


//-------------------------------------------- insert saved Quizzes -------------------------------
          const saveQuiz = async (e) =>{
            const newName = document.getElementById("newQuizName");
            const newNameValue = newName.value;
            const quizContent = textBoxValue;
            const user = getLoginState().user_id;
         
           const {data, error}= await supabase.from('quizzes').insert([
            {
                quiz_name: newNameValue,
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
        const heading = document.createElement("p");
        heading.id="quizzes-heading";
        heading.textContent="Saved Quizzes";
        const listElement = document.createElement("ul");
        

        // Loop through the array and create list items
      let count = 0;
        for (const item of array){
          //quizArray.push(item.content); //push content to array 
          const baseItem = document.createElement("div");
          baseItem.id = 'array-container'; //push id to each div
          
          
          const buttonItem = document.createElement("h3");
          buttonItem.className = "quizNames-Button";
          buttonItem.textContent = item.quiz_name; // Set the content of the list item
          buttonItem.addEventListener("click", () => {
            // Log the content of the clicked quiz to the console
            setTextBoxValue(item.content);
            setNameQuiz(item.name)
            //setTextBoxValue(item.content);
        });
          heading.append();
          baseItem.appendChild(buttonItem);
          listElement.appendChild(baseItem);
          count++;
        }
        containerElement.innerHTML = "";


        // Append the list to the container element
        containerElement.appendChild(listElement);
}   




    

    return(
      <div className="container2">
      <h1 className="main-heading">Generated Quiz</h1>
     

      <div className="text-container" >
        <div className="container-col">
              { savePress ?(
                  <div>
                    <h3 className='quizzes-heading'>Saved Quizzes</h3>
                      <div id="display-names" className="display-names"> 
                    
                    
                      </div>
                </div>
              ):(<div> </div>)}
                   
                      <textarea
                      className='text-box2'
                      id="text-box"
                      
                      value={textBoxValue}
                      
                      >
                          
                      </textarea>
                    

                    <button className="copy-button"id="copy-button" onClick={callCopy}>{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          { savePress ?(<div></div>):

          (<div className="container-row">
             Name:
                    <input type="text" 
                            className="quiz-nameBox" 
                            placeholder='Please enter name for Quiz'
                            id="newQuizName"
                    />
                 

          </div>
          )}

          
      </div>
     
      <div className="button-container2">
        { savePress ?(<div></div>):(
              <button className="saveButton"onClick={saveQuiz}>
                  Save
                  </button>
          )}

                 

              <button onClick={generatePDF}>
                  Get PDF</button>
              <button onClick={handleBack}>
                  Back</button>
          </div>
         

 
</div>
      
    );
};

export default QuizView;
