import { useQuiz } from "../contexts/QuizContext";

export default function StartScreen() {
  const { start, numQuestions } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button className="btn btn-ui" onClick={start}>Let's start</button>
    </div>
  );
}
