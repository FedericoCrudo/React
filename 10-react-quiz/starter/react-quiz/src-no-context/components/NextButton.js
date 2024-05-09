export default function NextButton({ dispatch, answer, numQuestions, index }) {
  if (answer === null) return null;
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "newxtQuestion" })}>{index === numQuestions - 1 ? "Finished" : "Next"}</button>
  )
}

