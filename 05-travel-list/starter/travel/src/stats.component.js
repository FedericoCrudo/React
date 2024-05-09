import { useState } from "react";

export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );

  const numItems = items.length;
  const packedItems = items.filter((el) => el.packed).length;
  const percPackedItems = Number.parseInt((packedItems / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percPackedItems === 100
          ? "You got everything! Ready to go"
          : `You have ${numItems} items on your list,and you already packed
          ${packedItems} (${percPackedItems}%)`}
      </em>
    </footer>
  );
}