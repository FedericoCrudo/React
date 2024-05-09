import { useState } from "react";

export function FormSplitBill({ friend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const friendExpense = bill ? bill - expense : "";
  function handler(e, event, name) {
    console.dir(event.name);
    if (!isFinite(e.target.value)) return;
    if (name === "expense" && e.target.value > bill) return;
    event(Number(e.target.value));
  }
  function handleSumbit(e) {
    e.preventDefault();
    if (!bill || !expense) return;

    handleSplitBill(whoIsPaying === 'user' ? friendExpense : -expense);
  }
  return (
    <form onSubmit={handleSumbit} className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>
      <label>💸Bill value</label>
      <input type="text" value={bill} onChange={(e) => handler(e, setBill, "bill")} />
      <label> 👤 Your expense</label>
      <input type="text" value={expense} onChange={(e) => handler(e, setExpense, "expense")} />
      <label>🧑‍🤝‍🧑 {friend.name} expense</label>
      <input disabled value={friendExpense} type="text" />
      <label>💸 Who is paying the bill?</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}
