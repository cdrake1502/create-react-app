import react from 'react';
import './quizview.css';


const QuizView = () => {

    return(
       
        <div className="container2">
            <h1 className="main-heading">Generated Quiz</h1>
        <textarea
          className="text-box2"
          placeholder="Enter your text here"
        />
        <div className="button-container2">
          <button>Save</button>
          <button>Back</button>
          <button>Exit</button>
        </div>
      </div>
      
    );
};

export default QuizView;