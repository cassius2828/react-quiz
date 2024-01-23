export const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) return;
  if(index < numQuestions - 1) return (
    <button
      onClick={() => dispatch({ type: "nextQuestion" })}
      className="btn btn-ui"
    >
      Next
    </button>
  );
  return (
    <button
      onClick={() => dispatch({ type: "finished" })}
      className="btn btn-ui"
    >
      Next
    </button>
  );
};
