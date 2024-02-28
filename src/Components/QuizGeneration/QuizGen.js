import React, {useState, useRef} from 'react';
import './QuizGen.css';



const QuizGen = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const textAreaRef = useRef(null); // Create a ref

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

  
    const generateTagline = async () => {
      try {
        const dropdown = document.getElementById("difficulty");
        const selectedOption = dropdown.options[dropdown.selectedIndex];
        const selectedValue = selectedOption.value;
        const Qnumber = countValue;

        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        console.log(apiKey);
        const endpoint = "https://api.openai.com/v1/chat/completions";

//         const apiKey = "fakenum";
//         //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
//         //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
//         const endpoint = "https://api.openai.com/v1/completions";
// >>>>>>> 74e9ff0c033099f49b94d0ca539cf21e2ed4286e
        console.log(countValue.toString());
    
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            prompt: "Using this information: "+ prompt +"Give me "+ Qnumber + "questions of " +selectedValue+ "difficulty that are multiple choice as well as give the answers. After each question give a line break as well as after the answers.  ",
            max_tokens: 2200, // Optional: Limit the length of the response
            temperature: 0.7, // Optional: Controls creativity (0.0: deterministic, 1.0: more creative)
            n: 1, // Number of completions to generate (1 in this case)
          })
        });
        
  
        if (response.ok) {
          const completion = await response.json();
          setResponse(completion.choices[0].text.trim());
        } else {
          console.error("API call failed with status:", response.status);
          console.log('API Key:', apiKey);
          console.log(process.env);
        }
      } catch (error) {
        console.error(error);
      }
     
    };

    const responseWithLineBreaks = response.replace(/(?:\r\n|\r|\n)/g, '<br>');
    

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
                <input type="checkbox" id="checkbox" name="checkbox"/>
              
                <div className="checkbox-container" id="checkbox1">
                    <label for="checkbox">Multiple Choice</label>
                    <input type="checkbox" id="mult" name="checkbox"/>
                    <label for="checkbox">Fill In Blank</label>
                    <input type="checkbox" id="fill" name="checkbox"/>
                    <label for="checkbox">Short Answer</label>
                    <input type="checkbox" id="short" name="checkbox"/>
                </div>
                <select className="dropdown" id="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
              
                <div id="counter">
                    <button onClick={decrement}>-</button>                
                    <span className="button-box"id="count">
                        0
                        </span>
                    <button onClick={increment}>+</button>
                </div>
                <select className="dropdown">
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                    <option value="Option 4">Option 4</option>
                    <option value="Option 5">Option 5</option>
                </select>
                <button className="generate-button" onClick={generateTagline}>Generate</button>
                </div>
                
            </div>
        </div>
      <div  className="response-test"  dangerouslySetInnerHTML={{ __html: responseWithLineBreaks }}></div>
    </body>
  );
};

export default QuizGen;

