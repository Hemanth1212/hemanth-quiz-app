import React from "react";
import { useState } from "react";
import "./question-card.css";

const makeChoices = (question, setState) => {
  let incChoices = [...question.incorrect_answers];
  let correctChoice = question.correct_answer;
  incChoices.push(correctChoice);
  incChoices = incChoices.map((choice) =>
    choice.replaceAll("&#039;", "'").replaceAll("&quot;", '"').replaceAll("&amp;","&")
  );
  setState((value) => {
    return {
      ...value,
      choices: incChoices.sort((a, b) => 0.5 - Math.random()),
    };
  });
};
const showQuestion = (questionIndex, questions, setState, action) => {
    const index = action === "prev" ? questionIndex-1 : questionIndex+1
  setState((value) => {
    let encoded = encodeURI(questions[index].question);
    const ques = decodeURI(encoded)
      .replaceAll("&#039;", "'")
      .replaceAll("&quot;", '"')
      .replaceAll("&amp;","&");
    return {
      ...value,
      questionText: ques,
      questionIndex: index,
    };
  });
  makeChoices(questions[index], setState);
  let prevAns = document.getElementsByClassName("selected-choice")[0];
  prevAns?.classList.remove("selected-choice");
};

const answerClicked = (index, setState) => {
  const elem = document.getElementById(`choice-${index}`);
  let prevAns = document.getElementsByClassName("selected-choice")[0];
  prevAns?.classList.remove("selected-choice");
  elem.classList.add("selected-choice");
  setState((value) => {
    let selectedOptions = [...value.selectedOptions];
    if (selectedOptions.filter((e) => e[value.questionIndex]).length) {
      selectedOptions = selectedOptions.map((e) => {
        if (e[value.questionIndex]) {
          e[value.questionIndex] = value.choices[index];
        }
        return e;
      });
    } else {
      const obj = { [value.questionIndex]: value.choices[index] };
      selectedOptions.push(obj);
    }
    return { ...value, selectedOptions };
  });
};

//COMPONENT -------->
const QuestionCard = ({ questions,getScore }) => {
  const [state, setState] = useState({
    questionIndex: 0,
    questionText: "",
    selectedOptions: [],
    choices: [],
  });
  const { questionText, choices, questionIndex, selectedOptions } = state;
  let encoded = encodeURI(questions[questionIndex].question);
  const question = questions[questionIndex];
  const ques = decodeURI(encoded)
    .replaceAll("&#039;", "'")
    .replaceAll("&quot;", '"');
  !questionText && setState({ ...state, questionText: ques });
  choices.length !== 4 && makeChoices(question, setState);

  return (
    <div className="question-card">
      <div className="question-holder">
        <div className="question">{questionText}</div>
      </div>

      <div className="choices-list">
        {choices.map((choice, index) => (
          <div
            className="choice"
            key={`choice-${index}`}
            id={`choice-${index}`}
            onClick={() => answerClicked(index, setState)}
          >
            {choice}
          </div>
        ))}
      </div>
      <div className="action-buttons">
        <div>
          <button className="button-73"  disabled={questionIndex === 0} onClick={() => showQuestion(questionIndex, questions, setState,"prev")}>Prev</button>
        </div>
        <div>
          {questionIndex === 14 && <button className="button-73" onClick={() => getScore(selectedOptions)}>Submit</button>}
        </div>
        <div>
          <button
            className="button-73"
            disabled={questionIndex === 14}
            onClick={() => showQuestion(questionIndex, questions, setState,"next")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
