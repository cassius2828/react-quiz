export const ProgressBar = ({
  index,
  numQuestions,
  currPoints,
  answer,
  totalPoints
}) => {
 
  return (
    <header className="progress">
      {/*
         if answer is true then the boolean turns into 1 and it will be plus 1 of the index
        if the answer is null then the boolean will turn into 0 and it will remain the same index
        cool trick!
         */}
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <div className="point-container">
        <p>
          Question<strong> {index + 1}</strong> / {numQuestions}
        </p>
        <span>
          {currPoints} / {totalPoints} points
        </span>
      </div>
    </header>
  );
};
