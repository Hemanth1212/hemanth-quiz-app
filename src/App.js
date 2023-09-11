import "./App.css";
import "./components/welcome-page";
import WelcomePage from "./components/welcome-page/welcome";
import QuestionCard from "./components/question-card/question-card";
import ScoreCard from "./components/score-card/score-card"
import React from "react";
import { useState } from "react";
export const MyContext = React.createContext(null);

function App() {
  const [data, setData] = useState([]);
  const [isWelcomePage, setWelcomePage] = useState(true);
  const [state, setState] = useState({ score: 0, quizSubmitted: false });
  const getStartedClicked = () => {
    fetch("https://opentdb.com/api.php?amount=15&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setWelcomePage(false);
  };
  const getScore = (selectedAnswers) => {
    const questions = data.results;
    let count = 0;
    selectedAnswers.forEach((e, index) => {
      e[index] === questions[index].correct_answer && count++;
    });
    setState({ ...state, score: count, quizSubmitted: true });
  };
  const {score,quizSubmitted} = state;
  return (
    <div className="quiz-app">
      <div className="quiz-body">
        {isWelcomePage && !quizSubmitted && <WelcomePage getStartedClicked={getStartedClicked} />}
        {!quizSubmitted && data?.results?.length === 15 && (
          <QuestionCard questions={[...data.results]} getScore={getScore}/>
        )}
        {quizSubmitted && <ScoreCard score={score}/>}
      </div>
    </div>
  );
}

export default App;
