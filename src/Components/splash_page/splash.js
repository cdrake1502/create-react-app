import React, {useState, useEffect} from 'react';
import './splash_global.css';
import './splash_index.css';
import Logo from "./logo.png";



const Splash = () =>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserFiles();
    }
  }, [isLoggedIn]);

  const fetchUserFiles = () => {
    const placeholderFiles = [
      { name: 'File 1', content: 'Quiz 1'},
      { name: 'File 2', content: 'Quiz 2'},
      { name: 'File 3', content: 'Quiz 3'},
    ];
    setUserFiles(placeholderFiles);
  };

  return(
    <div className="temp-splash">
      {/* <img className="icon" alt="" src={Logo} /> */}
      <div className="container">
        <div className="wrapper">
          {isLoggedIn ? (
            <div>
              {userFiles.map((file, index) => (
                <div key={index}>
                  <h3>{file.name}</h3>
                  <p>{file.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="description">
              <h2>Quizify</h2>
              <p>An AI-powered quiz maker created to enhance your studying needs.</p>
              <p>Sign up or Login to begin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Splash;
