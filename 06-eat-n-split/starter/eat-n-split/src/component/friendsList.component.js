import Friend from "./friend.component";

export default function FriendsList({ friends, handleSelectedFrined, friendSelected }) {

  return (
    <ul>
      {friends.map(el => <Friend key={el.id} friendSelected={friendSelected} handleSelectedFrined={handleSelectedFrined} friend={el} />)}
    </ul>
  );
}
