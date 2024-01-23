import DateCounter from "./components/DateCounter";
import Error from "./components/presentational/Error";
import Loader from "./components/presentational/Loader";
import React, { useEffect, useReducer } from "react";
import Header from "./layout/Header";
import { Main } from "./layout/Main";
import "./App.css";
import { StartScreen } from "./components/Start";
import { Question } from "./components/Question";
import { ProgressBar } from "./components/ProgressBar";
import { FinishScreen } from "./components/FinishScreen";
import { Footer } from "./layout/Footer";
import { Timer } from "./components/Timer";
import { NextButton } from "./components/NextButton";
import {Reset} from "./components/Reset";

const SECSONDS_PER_QUESTION = 21;

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  currPoints: 0,
  highscore: 30,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECSONDS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        currPoints:
          action.payload === question.correctOption
            ? state.currPoints + question.points
            : state.currPoints,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.currPoints > state.highscore
            ? state.currPoints
            : state.highscore,
      };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    currPoints,
    highscore,
    secondsRemaining,
  } = state;

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, value) => acc + value.points, 0);

  const JSON_PORT = process.env.REACT_APP_JSON_PORT;

  useEffect(() => {
    console.log(secondsRemaining);
  }, [secondsRemaining]);

  // fetch from fake API
  useEffect(() => {
    fetch(`http://localhost:${JSON_PORT}/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              numQuestions={numQuestions}
              currPoints={currPoints}
              questions={questions}
              answer={answer}
              totalPoints={totalPoints}
            />
            <Question
              questions={questions}
              answer={answer}
              dispatch={dispatch}
              index={index}
              question={questions[index]}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                numQuestions={numQuestions}
                index={index}
                dispatch={dispatch}
                answer={answer}
              />
                <Reset dispatch={dispatch}/>
            </Footer>
          
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            highscore={highscore}
            points={currPoints}
            totalPoints={totalPoints}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
