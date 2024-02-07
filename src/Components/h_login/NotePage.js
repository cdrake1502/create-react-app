import React from "react";
import "./notepageglobal.css";
import "./notepageindex.css";

const NotePage = () => {

  return(
    <div class="home-w-login">
      <section class="first-frame">
        <header class="second-frame">
          <div class="second-frame-child"></div>
          <a href="my_q_index.html"><div class="my-quizzes">my quizzes</div></a>
          <div class="home-frame">
            <div class="frame-within-home">
              <div class="frame-within-home-child"></div>
              <a href="h_login_index.html"><div class="home">home</div></a>
            </div>
            <div class="frame-within-home1">
              <div class="frame-within-home-item" id="rectangle"></div>
              <a href="h_nologin_index.html"><div class="log-out">log out</div></a>
            </div>
          </div>
        </header>
        <div class="class-frame">
          <div class="second-frame-within-class">
            <div class="your-classes">your classes</div>
            <img
              class="second-frame-within-class-child"
              loading="eager"
              alt=""
              src="./public/arrow-1.svg"
            />
          </div>
        </div>
      </section>
      <div class="third-frame">
        <div class="recent-quizzes-text">
          <div class="recent-quizzes">recent quizzes</div>
          <img
            class="recent-quizzes-text-child"
            loading="eager"
            alt=""
            src="./public/arrow-1.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default NotePage;
