import { useState } from "react";

export default function AddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function addFriend(e) {
    if (!name || !image) return;
    const id = crypto.randomUUID;
    e.preventDefault();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      id,
      balance: 0,
    };
    setName("");
    setImage("https://i.pravatar.cc/48");
    handleAddFriend(newFriend);
  }
  return (
    <form onSubmit={addFriend} className="form-add-friend">
      <label>👤Friend name</label>
      <input
        name="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
      />
      <label>🖼️ image URL</label>
      <input
        name="image"
        onChange={(e) => setImage(e.target.value)}
        value={image}
        type="text"
      />
      <button className="button">Add</button>
    </form>
  );
}
