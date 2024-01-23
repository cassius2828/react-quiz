export const Reset = ({ dispatch }) => {
  return (
    <button onClick={() => dispatch({ type: "reset" })} className="btn btn-ui reset">
      Reset the Quiz
    </button>
  );
};
