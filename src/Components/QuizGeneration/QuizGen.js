import React, {useState, useRef, useEffect} from 'react';
import './QuizGen.css';
import { useNavigate } from 'react-router-dom';






const QuizGen = () => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [selectedOptions, setSelectedOptions] = useState('');
    const textAreaRef = useRef(null); // Create a ref


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
            console.log(countValue);
        }

        function decrement() {
            if (countValue > 0) {
                countValue--;
                updateCounter();
                console.log(countValue);
            }
        }

        function updateCounter() {
            countElement.textContent = countValue;
        }
//-------------counter for number of questions --------------------//


//-------------counter for number of questions --------------------//

const navigateToQuizView = () => {
  navigate('/quizview');
};

//-------------counter for number of questions --------------------//



//---------------------------------------------------api call ----------------------------------//
  
const generateTagline = async () => {
  try {
    const dropdown = document.getElementById("difficulty");
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const selectedValue = selectedOption.value;
    const questionType = selectedOptions;
    const answerBool = isChecked;
    let answerString = "";
    
    if (answerBool == true){
      answerString = "Please add the answers to each question";
    }else {
      answerString = "Do not add answers to these questions";
    }
    
   
    const Qnumber = countValue;
    //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
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    
    const endpoint = "https://api.openai.com/v1/completions";
    console.log(apiKey);

    // Make the API call using Fetch API
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
              prompt: "Using this information:"+ 
              prompt +"Give me "+
              Qnumber + "questions of "
                +selectedValue+ "difficulty that are "
                + questionType +". "+answerString,
        max_tokens: 500, // Optional: Limit the length of the response
        temperature: 0.7, // Optional: Controls creativity (0.0: deterministic, 1.0: more creative)
        n: 1, // Number of completions to generate (1 in this case)
      })
    });
    

    // Check if the response is successful
    if (response.ok) {
      const completion = await response.json();
      setResponse(completion.choices[0].text.trim());
    } else {
      console.error("API call failed with status:", response.status);
    }
  } catch (error) {
    console.error(error);
  }
 
};

const responseWithLineBreaks = response.replace(/(?:\r\n|\r|\n)/g, '<br>');

    //---------------------------------------------------api call ----------------------------------//
    




  return (
    <body>
        <div className="container-file">
                <div>
                    <h1 className="audio-title">Audio File</h1>
                </div>
                <div class="file-input-container">
                    <input type="file" class="file-input"/>
                </div>
                <div class="button-container">
                    <button class="generate-button">Generate</button>
                </div>
            </div>
            
            <div className="container">
            <div className="textbox-container">
                <textarea className="textbox prompt" 
                    value={prompt} 
                    ref={textAreaRef}  
                    onChange={(e) => setPrompt(e.target.value)} 
                    placeholder="Enter your notes here...">
                      
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
                <button className="generate-button" onClick={generateTagline}>Generate</button>
                </div>
                
            </div>
        </div>
      <div  className="response-test"  dangerouslySetInnerHTML={{ __html: responseWithLineBreaks }}></div>
    </body>
  );
};

export default QuizGen;

