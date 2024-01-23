import { useEffect } from "react";

export const Timer = ({ dispatch, secondsRemaining }) => {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <>
      {" "}
      <div className="timer">
        {mins < 10 ? "0" + mins : mins}:{seconds < 10 ? "0" + seconds : seconds}
      </div>
    </>
  );
};
