import React from "react";

export const Options = ({ question, answer, dispatch }) => {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={option}
          disabled={hasAnswered}
          className={`btn btn-option ${index === answer ? "answer" : ""}

          ${
            // if question has been answered run the below logic
            // else return an empty string
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
