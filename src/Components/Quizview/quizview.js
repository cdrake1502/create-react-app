import react, { useState,useContext }from 'react';
import './quizview.css';
import CopyQuiz from './copyquiz';




const QuizView = (props) => {
    const {response} = props;
    console.log({response});

  

    
    //for copying the text -------------------------------------------------------//
    const [textToCopy, setTextToCopy] = useState('');

    const handleTextAreaChange = (event) => {
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
              
                id="text-box"
                value={response}
                onChange={handleTextAreaChange}
                className="text-box2"
                placeholder=" "
                >{textToCopy} </textarea>
                <button id="copy-button" onClick={copyToClipboard}>{copied ? 'Copied!' : 'Copy'}</button>
            </div>
            <div className="button-container2">
                    <button>Save</button>
                    <button>Back</button>
                    <button>Exit</button>
                </div>
               

       
      </div>
      
    );
};

export default QuizView;
