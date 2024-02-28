import React, { useState } from 'react';
import './QuizGen.css';

const QuizGen = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [countValue, setCountValue] = useState(0);
    const [difficulty, setDifficulty] = useState('easy');

    const increment = () => {
        setCountValue(prevCount => prevCount + 1);
    };

    const decrement = () => {
        if (countValue > 0) {
            setCountValue(prevCount => prevCount - 1);
        }
    };

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    const generateTagline = async () => {
        try {
            const apiKey = "YOUR_API_KEY";
            const endpoint = "https://api.openai.com/v1/completions";
    
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-instruct',
                    prompt: `Using this information: ${prompt} Give me ${countValue} questions of ${difficulty} difficulty that are multiple choice as well as give the answers. After each question give a line break as well as after the answers.`,
                    max_tokens: 500,
                    temperature: 0.7,
                    n: 1,
                })
            });

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

    return (
        <div className="container">
            <textarea
                className="textbox prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your notes here..."
            ></textarea>

            <div id="counter">
                <button onClick={decrement}>-</button>
                <span className="button-box">{countValue}</span>
                <button onClick={increment}>+</button>
            </div>

            <select className="dropdown" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <button className="generate-button" onClick={generateTagline}>Generate</button>

            <div className="response-test">{response}</div>
        </div>
    );
};

export default QuizGen;
