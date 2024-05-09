import { useQuiz } from "../contexts/QuizContext";

export default function Options({ question }) {
  const { newAnswer, answer } = useQuiz();
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button disabled={hasAnswered} className={`btn btn-option ${index === answer ? "answer" : ""}  ${hasAnswered ? index === question.correctOption ? "correct" : "wrong" : ""}`} key={option} onClick={() => newAnswer(index)}>
          {option}
        </button>
      ))
      }
    </div >
  )
}

