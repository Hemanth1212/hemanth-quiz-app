import { ReactComponent as QuizLogo } from "../assets/quiz.svg";
import React from "react";
import "./welcome.css";
import WelcomeCard from "../welcome-card/welcome-card";

function WelcomePage({ getStartedClicked }) {
  return (
    <div className="welcome-page">
      {/* <WelcomeCard getStartedClicked={getStartedClicked}/> */}
      <div className="quiz-time">Quiz Time</div>
      <div className="quiz-logo">
        <QuizLogo />
      </div>
      <div className="start-button">
        <div className="wrap">
          <button className="button" onClick={() => getStartedClicked()}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
