import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./splash_global.css";
import "./splash_index.css";
import topPic from "./topPic.png";
import bottom from "./bottom.png";

const Splash = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserFiles();
    }
  }, [isLoggedIn]);

  const fetchUserFiles = () => {
    const placeholderFiles = [
      { name: "File 1", content: "Quiz 1" },
      { name: "File 2", content: "Quiz 2" },
      { name: "File 3", content: "Quiz 3" },
    ];
    setUserFiles(placeholderFiles);
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="split-container">
      <div className="left-content">
        <div className="description">
          <h1>Quizify</h1>
          <p>
            Quizify is an Artificial Intelligence powered Quiz generation web
            applicaion for all your study needs.
          </p>
          <p>
            We strive to provide a meaningful and accurate way for students to
            easily learn and study materials related to their courses.{" "}
          </p>
          <p>
            Its easy at 1.2.3... Just sighn up , paste or upload your notes,
            configure your preferences, and download.{" "}
          </p>
          <p>
            <text onClick={handleSignup}>
              Sign up &nbsp;
            </text>
            or &nbsp;
            <text onClick={handleLogin}>
              Login &nbsp;
            </text>
            to begin.
          </p>
        </div>
      </div>
      <div className="right-content">
        <img className="image1" src={topPic} alt="example of useage" />

        <img className="image2" src={bottom} alt="example of useage" />
      </div>
    </div>
  );
};
export default Splash;
