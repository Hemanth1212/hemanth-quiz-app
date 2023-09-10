import "./App.css";
import "./components/welcome-page";
import WelcomePage from "./components/welcome-page/welcome";
import QuestionCard from "./components/question-card/question-card";
import React from "react";
import { useState } from "react";
export const MyContext = React.createContext(null);

function App() {
  const [data, setData] = useState([]);
  const [isWelcomePage, setWelcomePage] = useState(true);
  const getStartedClicked = () => {
    fetch("https://opentdb.com/api.php?amount=15&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
      setWelcomePage(false);
  };
  console.log({ data });
  return (
    <div className="quiz-app">
      <div className="quiz-body">
        {isWelcomePage && <WelcomePage getStartedClicked={getStartedClicked} />}
        {data?.results?.length === 15 && <QuestionCard questions={[...data.results]}/>}
      </div>
    </div>
  );
}

export default App;
