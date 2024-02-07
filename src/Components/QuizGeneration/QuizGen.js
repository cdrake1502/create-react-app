import React from 'react';
import './QuizGen.css';

const QuizGen = () => {

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
            <textarea className="textbox" placeholder="Enter your notes here..."></textarea>
            <div className="button-container">
            <label for="checkbox">Provide answers</label>
            <input type="checkbox" id="checkbox" name="checkbox"/>
          
            <div className="checkbox-container">
                <label for="checkbox">Multiple Choice</label>
                <input type="checkbox" id="mult" name="checkbox"/>
                <label for="checkbox">Fill In Blank</label>
                <input type="checkbox" id="fill" name="checkbox"/>
                <label for="checkbox">Short Answer</label>
                <input type="checkbox" id="short" name="checkbox"/>
            </div>
            <select className="dropdown">
                <option value="diff">Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
           
            <div id="counter">
                <button onClick={decrement}>-</button>                
                <span className="button-box"id="count">0</span>
                <button onClick={increment}>+</button>
            </div>
            <select className="dropdown">
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
                <option value="Option 4">Option 4</option>
                <option value="Option 5">Option 5</option>
            </select>
            <button className="generate-button">Generate</button>
            </div>
        </div>
        </div>
    </body>
  );
};

export default QuizGen;
