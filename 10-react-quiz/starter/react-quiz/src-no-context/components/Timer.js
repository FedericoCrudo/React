import { useEffect } from "react"

export default function Timer({ Timeout, dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60).toString().padStart(2, "0");
  const seconds = (secondsRemaining % 60).toString().padStart(2, "0");
  useEffect(function () {
    const id = setInterval(function () {
      dispatch({ type: "tick" })
    }, 1000)
    return () => clearInterval(id);
  }, [dispatch])
  return (
    <div className="timer">
      {mins}:{seconds}
    </div>
  )
}

