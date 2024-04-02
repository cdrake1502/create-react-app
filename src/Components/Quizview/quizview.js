import react, { useState, useContext }from 'react';
import './quizview.css';
import CopyQuiz from './copyquiz';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';



const QuizView = (props) => {
    
    const navigate = useNavigate();

    
    const [textBoxValue, setTextBoxValue] = useState(props.response);
        const generatePDF = () => {
            const doc = new jsPDF();
            doc.text(textBoxValue, 10, 10);
            doc.save('quiz.pdf');
        };
        
    

        const navigateToQuizGen = () => {
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
    
   
        const handleExit = () => {
          window.location.reload();
        };
    
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
                    <button onClick={handleExit}>
                        Exit</button>
                </div>
               

       
      </div>
      
    );
};

export default QuizView;
