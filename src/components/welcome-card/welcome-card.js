import { ReactComponent as QuizLogo } from "../assets/quiz.svg";
import React from "react";
import "./welcome-card.css";

function WelcomeCard({ getStartedClicked }) {
  return (
    <div>
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

export default WelcomeCard;
