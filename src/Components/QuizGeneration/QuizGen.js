import React, {useState, useRef} from 'react';
import './QuizGen.css';
import { useNavigate } from 'react-router-dom';
import {getLoginState} from "../authenticate/getLoginState"; 
import { setResponseState } from "../apiresponse/setResponseState";
import {getResponseState} from "../apiresponse/getResponseState";



const QuizGen = (props) => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [response, setResponseValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState('');
    const textAreaRef = useRef(null); // Create a ref
   
    //console.log(props.onResponse);
    


//---------------------handle check boxes for question type -----------------//
    const handleCheckboxChange = (event) => {
      const { checked, name } = event.target;
      let updatedOptions = '';

      if (checked) {
        updatedOptions = selectedOptions
          ? `${selectedOptions}, ${name}`
          : name;
      } else {
        updatedOptions = selectedOptions
          .split(', ')
          .filter((option) => option !== name)
          .join(', ');
      }

      setSelectedOptions(updatedOptions);
    };
//---------------------handle check boxes for question type -----------------//
const [isChecked, setIsChecked] = useState(false); // Initial state for the checkbox

const handleCheckboxAns = (event) => {
  const { checked } = event.target;
  setIsChecked(checked);
};


//-------------counter for number of questions --------------------//
    let countValue = 0;

        const countElement = document.getElementById('count');
       
        function increment() {
            countValue++;
            updateCounter();
            
        }

        function decrement() {
            if (countValue > 0) {
                countValue--;
                updateCounter();
              
            }
        }

        function updateCounter() {
            countElement.textContent = countValue;
        }
//-------------counter for number of questions --------------------//




const handleQuizView = () => {
  navigate('/quizview');
};





//---------------------------------------------------api call ----------------------------------//
  
const generateTagline = async () => {
  try {
    const dropdown = document.getElementById("difficulty");
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const selectedValue = selectedOption.value;
    const questionType = selectedOptions;
    const answerBool = isChecked;
    let answerString = "";
    
    if (answerBool === true){
      answerString = "Please add the answers to each question";
    }else {
      answerString = "Do not add answers to these questions";
    }
    
   
    const Qnumber = countValue;
  
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
   //const apiKey = "sk-o4XT0McKTdcSYd7QKKSZT3BlbkFJ72jiqzy9SgiFoNcK6Fi
    
    const endpoint = "https://api.openai.com/v1/completions";
    console.log(apiKey);

    // Make the API call using Fetch API
    const promptString = ("Using this information: "+ 
              prompt +" Give me "+
              Qnumber + " questions of "
                +selectedValue+ " difficulty that are "
                + questionType +". "+ answerString)
    console.log("prompt:" +promptString);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
              prompt: promptString,
        max_tokens: 1000, // Optional: Limit the length of the response
        temperature: 0.7, // Optional: Controls creativity (0.0: deterministic, 1.0: more creative)
        n: 1, // Number of completions to generate (1 in this case)
      })
    });
    

    // Check if the response is successful
    if (response.ok) {
      const completion = await response.json();
      const finishedResponse = (completion.choices[0].text.trim());
      //console.log(finishedResponse);
      return finishedResponse;
     

    } else {
      console.error("API call failed with status:", response.status);
    }
  } catch (error) {
    console.error(error);
  }

};
const handleGenerateQuiz =async (props) => {


  const processedResponse = await generateTagline();
  if (processedResponse) {
    // Pass the processedResponse to the target component (explained next)
    setResponseValue(processedResponse); // Assuming TargetComponent exists
    setResponseState(processedResponse);
    handleQuizView();
    
    
  } else {
    // Handle API call failure (optional)
    alert("No response was generated");
  }
};

   




    //---------------------------------------------------api call ----------------------------------//
 
    //------------------------------Get Text file ---------------------------//
  
   //-------------------Get Text file ---------------------------//
   function convertFileToString() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
  
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const fileString = event.target.result;
      const fixedString = fileString.replace(/\r?\n/g, "\n");

  
      // Use the file string for further processing
      setPrompt(fixedString);
      // You can display it in an element, process it, etc.
    };

  
    reader.readAsText(file);
  }
  


  return (

  <div>
       
        <div className="container-file">
                <div>
                    <h1 className="audio-title">Add Text File Only</h1>
                </div>
                <div className="file-input-container">
                    <input type="file" class="file-input" id="fileInput"/>
                    <p>After Clicking generate below your quiz will be converted and dropped in the Generate Quiz box below</p>
                </div>
                <div className="button-container">
                    <button id="convertButton" class="generate-button" onClick={convertFileToString} >Submit Notes</button>
                </div>
            </div>
            
            <div className="container">
             
            <div className="textbox-container">
              <h1 className="audio-title">Generate Quiz</h1>
                <textarea className="textbox prompt" 
                value={prompt} 
                ref={textAreaRef}  
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Enter your notes here..."
                >
                     
                </textarea>
                <div className="button-container">
                <label for="checkbox">Provide answers</label>
                <input 
                type="checkbox" 
                id="checkbox" 
                name="checkbox"
                checked={isChecked}
                onChange={handleCheckboxAns}
                />
              
                <div className="checkbox-container" id="checkbox1">
                    <label for="checkbox">Multiple Choice</label>
                    <input 
                      type="checkbox" 
                      id="mult" 
                      name="Multiple Choice"
                      onChange={handleCheckboxChange}
                      />
                    <label for="checkbox">Fill In Blank</label>
                    <input 
                      type="checkbox"
                      id="fill" 
                      name="Fill In Blank"
                      onChange={handleCheckboxChange}
                      />
                    <label for="checkbox">Short Answer</label>
                    <input 
                      type="checkbox" 
                      id="short" 
                      name="Short Answer"
                      onChange={handleCheckboxChange}
                      />
                </div>
                <select className="dropdown" id="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
              
                <div id="counter">
                    <button onClick={decrement}>-</button>                
                    <span className="button-box"id="count" > 0
                        </span>
                    <button onClick={increment}>+</button>
                </div>
                <button className="generate-button" onClick={handleGenerateQuiz}>Generate</button>
               
                </div>
                
            </div>
        </div>
      </div>
  
  );

};
// <div  className="response-test"  dangerouslySetInnerHTML={{ __html: responseWithLineBreaks }}></div>
export default QuizGen;

