import react, { useState}from 'react';
import './quizview.css';
import CopyQuiz from './copyquiz';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import {getResponseState} from "../apiresponse/getResponseState";



const QuizView = () => {
    
    const navigate = useNavigate();
    const [textBoxValue, setTextBoxValue] = useState(getResponseState().Response);
        const generatePDF = () => {
            const doc = new jsPDF();
            doc.text(textBoxValue, 10, 10);
            doc.save('quiz.pdf');
        };
        
    

        const handleBack = () => {
            navigate('/quizgen');
          };
  

    
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
                    <button>Save</button>
                    <button onClick={generatePDF}>
                        Get PDF</button>
                    <button onClick={handleBack}>
                        Back</button>
                </div>
               

       
      </div>
      
    );
};

export default QuizView;
