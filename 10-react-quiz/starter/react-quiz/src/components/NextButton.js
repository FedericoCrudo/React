import { useQuiz } from "../contexts/QuizContext";

export default function NextButton() {
  const { nextQuestions, answer, numQuestions, index } = useQuiz();


  if (answer === null) return null;
  return (
    <button className="btn btn-ui" onClick={nextQuestions}>{index === numQuestions - 1 ? "Finished" : "Next"}</button>
  )
}

