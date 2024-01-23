import { Options } from "./Options";

export const Question = ({  question, dispatch, answer}) => {


  return (
    <div style={{ textAlign: "center", fontSize: "3rem" }}>
      <div >
        <h4>{question?.question}</h4>
     
      </div>
      <Options answer={answer} dispatch={dispatch} question={question} />
    </div>
  );
};
