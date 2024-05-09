export function Item({ item, changePacked, deleteItem }) {
  return (
    <li>
      <input
        onChange={changePacked}
        checked={item.packed ? "checked" : ""}
        value={item.packed}
        type="checkbox"
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={deleteItem}>❌</button>
    </li>
  );
}