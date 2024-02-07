import React from "react";
import "./nologinglobal.css";
import "./nologinindex.css";

const NoLogin = () => {
  return(
    <div class="home-wo-login">
      <section class="main-frame">
        <header class="frame-a">
          <div class="home-frame">
            <div class="home-frame-child"></div>
            <a href="h_nologin_index.html"><div class="home">home</div></a>
          </div>
          <div class="home-frame1">
            <div class="home-frame-item"></div>
            <a href="quiz_v_index.html"><div class="my-quizzes">my quizzes</div></a>
          </div>
          <div class="home-frame2">
            <div class="home-frame-inner" id="rectangle"></div>
            <a href="login_index.html"><div class="login">login</div></a>
          </div>
        </header>
        <div class="frame-c">
          <div class="frame-d">
            <div class="your-classes">your classes</div>
            <img
              class="frame-d-child"
              loading="eager"
              alt=""
              src="./public/arrow-1.svg"
            />
          </div>
        </div>
      </section>
      <div class="home-frame3">
        <div class="frame-e">
          <div class="recent-quizzes">recent quizzes</div>
          <img
            class="frame-e-child"
            loading="eager"
            alt=""
            src="./public/arrow-1.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default NoLogin;
