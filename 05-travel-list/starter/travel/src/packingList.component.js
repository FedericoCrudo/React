import { Item } from "./item.component";
import { useState } from "react";

export default function PackingList({ items, clearList, changePacked, deleteItem }) {
  const [sortBy, setSortBy] = useState("input");
  let sortArray;
  function handleSort(e) {
    setSortBy(e.target.value);
  }

  switch (sortBy) {
    case "input":
      sortArray = items;
      break;
    case "description":
      sortArray = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
      break;
    default:
      sortArray = [...items].sort(
        (a, b) => Number(a.packed) - Number(b.packed)
      );
      break;
  }

  return (
    <div className="list">
      <ul>
        {sortArray.map((el) => (
          <Item
            deleteItem={() => deleteItem(el.id)}
            changePacked={() => changePacked(el.id)}
            key={el.id}
            item={el}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={handleSort}>
          <option default value="input">
            Sort by input order
          </option>
          <option default value="description">
            Sort by input description
          </option>
          <option default value="packed">
            Sort by packed status
          </option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}