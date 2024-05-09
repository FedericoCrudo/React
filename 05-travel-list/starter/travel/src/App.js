// import { useState } from "react";
// import "./App.css";
// import Logo from "./logo.component";
// import Form from "./form.component";
// import PackingList from "./packingList.component";
// import Stats from "./stats.component";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "charger", quantity: 12, packed: true },
// ];

// export default function App() {
//   const [items, setItems] = useState(initialItems);
//   const numItems = items.length;

//   function handleAddItems(item) {
//     setItems([...items, item]);
//   }
//   function deleteItem(id) {
//     setItems(items.filter((el) => el.id !== id));
//   }
//   function changePacked(id) {
//     setItems((items) =>
//       items.map((el) => (el.id === id ? { ...el, packed: !el.packed } : el))
//     );
//   }
//   function clearList() {
//     const confirmed = window.confirm("Are you sure want to delete all items?");
//     if (confirmed) setItems([]);
//   }
//   return (
//     <div className="app">
//       <Logo />
//       <Form items={items} handleAddItems={handleAddItems} />
//       <PackingList
//         changePacked={changePacked}
//         deleteItem={deleteItem}
//         items={items}
//         clearList={clearList}
//       />
//       <Stats items={items} />
//     </div>
//   );
// }

import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 12, packed: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function clearList() {
    const confirmed = window.confirm("Are you sure you want delete all items?");
    confirmed && setItems([]);
  }
  function deleteItem(id) {
    setItems((items) => items.filter((el) => el.id !== id));
  }
  function handleSubmit(e, description, quantity) {
    e.preventDefault();
    if (!description || !quantity) return;
    const obj = {
      id: items.at(-1).id + 1,
      description,
      quantity,
      packed: false,
    };
    setItems((items) => [...items, obj]);
  }
  function onToggleItem(id) {
    setItems((items) =>
      items.map((el) => (el.id === id ? { ...el, packed: !el.packed } : el))
    );
  }
  return (
    <div>
      <Logo />
      <Form handleSubmit={handleSubmit} />
      <PackingList
        onToggleItem={onToggleItem}
        items={items}
        deleteItem={deleteItem}
        clearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🌴 Far Away</h1>;
}
function Form({ handleSubmit }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  return (
    <form
      className="add-form"
      onSubmit={(e) => handleSubmit(e, description, quantity)}
    >
      <h3>What do you need for your trip? </h3>
      <select onChange={(e) => setQuantity(+e.target.value)} value={quantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Item..."
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, deleteItem, onToggleItem, clearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sorted;
  if (sortBy === "input") sorted = items;
  if (sortBy === "description")
    sorted = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortBy === "packed")
    sorted = [...items].sort((a, b) => Number(b.packed) - Number(a.packed));
  return (
    <div className="list">
      <ul>
        {sorted.length > 1 &&
          sorted.map((el) => (
            <Item
              key={el.id}
              onToggleItem={onToggleItem}
              item={el}
              deleteItem={deleteItem}
            />
          ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => setSortBy((sort) => e.target.value)}
        >
          <option value="input">Sort by Input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}
function Item({ item, deleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const perc = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {perc === 100
          ? "You are everthing! Ready t o go"
          : `You have ${numItems}items on your list, and you already packed
        ${numPacked} (${perc} %)`}
      </em>
    </footer>
  );
}
