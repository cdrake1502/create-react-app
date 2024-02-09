import React from "react";
import "./notepageglobal.css";
import "./notepageindex.css";

const NotePage = () => {
  return (
    <div className="home-w-login">
      <header className="header">
        <div className="logo">Logo</div>
        <nav className="nav">
          <a href="my_q_index.html">My Quizzes</a>
          <a href="h_login_index.html">Home</a>
          <a href="h_nologin_index.html">Log Out</a>
        </nav>
      </header>
      <main className="main-content">
        <section className="section">
          <h2 className="section-title">Recent Quizzes</h2>
          <div className="quiz-list">
            {/* Display recent quizzes here */}
            <div className="quiz">Quiz 1</div>
            <div className="quiz">Quiz 2</div>
            <div className="quiz">Quiz 3</div>
          </div>
        </section>
        <section className="section">
          <h2 className="section-title">Your Classes</h2>
          <div className="class-list">
            {/* Display classes here */}
            <div className="class">Class 1</div>
            <div className="class">Class 2</div>
            <div className="class">Class 3</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotePage;
