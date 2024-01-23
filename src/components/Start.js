import React from "react";

export const StartScreen = ({numQuestions, dispatch}) => {
  return (
    <div className="start">
      {" "}
      <h2>Welcome to the React Quiz</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button onClick={()=> dispatch({type: 'start'})} className="btn btn-ui">start quiz</button>
    </div>
  );
};
