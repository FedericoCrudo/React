import { useState } from "react";
import AddFriend from "./component/addFriend.component";
import FriendsList from "./component/friendsList.component";
import { FormSplitBill } from "./component/formSplitBill.component";
import "./App.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [isOpenAddFrined, setIsOpenAddFrined] = useState(false);
  const [friendSelected, setFriendSelected] = useState(null);

  function toggleAddFrined() {
    setIsOpenAddFrined(() => !isOpenAddFrined);
  }
  function handleAddFriend(friend) {
    setFriends(() => [...friends, friend]);
  }
  function handleSelectedFrined(friend) {
    setFriendSelected((cur) => (cur?.id === friend.id ? null : friend));
    setIsOpenAddFrined(() => false);
  }
  function handleSplitBill(value) {
    setFriends(
      friends.map((el) =>
        el.id === friendSelected.id
          ? { ...el, balance: el.balance + value }
          : el
      )
    );
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          friendSelected={friendSelected}
          handleSelectedFrined={handleSelectedFrined}
        />
        {isOpenAddFrined && <AddFriend handleAddFriend={handleAddFriend} />}
        <button onClick={toggleAddFrined} className="button">
          {isOpenAddFrined ? "Close" : "Open"}
        </button>
      </div>
      {friendSelected && (
        <FormSplitBill key={friendSelected.id}
          friend={friendSelected}
          handleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
