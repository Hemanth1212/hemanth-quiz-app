import React from "react";
import "./score-card.css";

function ScoreCard({score}) {
  return (
    <div className="score-card">
    <div className="score-text">
    Your Score
    </div>
    <div className="score">
    {score}
    </div>
      
    </div>
  );
}

export default ScoreCard;
