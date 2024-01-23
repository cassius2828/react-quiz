import { Reset } from "./Reset";

export const FinishScreen = ({ totalPoints, points, highscore, dispatch }) => {
  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥳";
  if (percentage >= 50 && percentage < 80) emoji = "🤷🏽‍♂️";
  if (percentage >= 0 && percentage < 50) emoji = "🍅";
  if (percentage === 0) emoji = "🤦🏽‍♂️";
  return (
    <>
      {" "}
      <p className="result">
        {emoji} you scored {points} / {totalPoints} points{" "}
        <strong> ({Math.ceil(percentage)}%)</strong>
      </p>
      <span className="highscore">Highscore: {highscore} points</span>
      <Reset dispatch={dispatch} />
    </>
  );
};
