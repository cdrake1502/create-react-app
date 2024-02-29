import React from 'react';
import jsPDF from 'jspdf';

const quizview = ({quizContent}) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(quizContent, 10, 10);
        doc.save('quiz.pdf');

    };

    return (
        <div>
            <h1>Quiz Preview</h1>
            <button onClick={generatePDF}>Download Quiz</button>
        </div>
    );
};

export default quizview;