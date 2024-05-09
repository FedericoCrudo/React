import { useQuiz } from "../contexts/QuizContext";

export default function FinishScreen() {
  const { restart, points, numMaxPoints, highscore } = useQuiz();
  const percentage = (points / numMaxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong> {points}</strong> out of{" "}
        {numMaxPoints}({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={restart}>
        Restart
      </button>
    </>
  );
}
