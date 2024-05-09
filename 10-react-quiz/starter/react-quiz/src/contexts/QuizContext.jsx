import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();
const SECS = 30;
const initialState = {
  questions: [],
  //loading,error,ready,active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "newxtQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        status:
          state.index === state.questions.length - 1
            ? "finished"
            : state.status,
        highscore:
          state.index === state.questions.length - 1
            ? state.points > state.highscore
              ? state.points
              : state.highscore
            : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknow");
  }
}
function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const numMaxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);

  function start() {
    dispatch({ type: "start" });
  }
  function tick() {
    dispatch({ type: "tick" });
  }
  function nextQuestions() {
    dispatch({ type: "newxtQuestion" });
  }
  function restart() {
    dispatch({ type: "restart" });
  }
  function newAnswer(index) {
    dispatch({ type: "newAnswer", payload: index });
  }
  return (
    <QuizContext.Provider
      value={{
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        numMaxPoints,
        start,
        tick,
        nextQuestions,
        restart,
        questions,
        newAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("QuizContext we used outside AuthProvider");
  return context;
}
export { QuizProvider, useQuiz };
