import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function Timer() {
  const { tick, secondsRemaining } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsRemaining % 60).toString().padStart(2, "0");

  useEffect(
    function () {
      const id = setInterval(function () {
        tick();
      }, 1000);
      return () => clearInterval(id);
    },
    [tick]
  );
  return (
    <div className="timer">
      {mins}:{seconds}
    </div>
  );
}
