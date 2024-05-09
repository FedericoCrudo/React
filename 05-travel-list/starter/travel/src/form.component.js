export default function Form({ handleAddItems }) {
  console.dir(handleAddItems);
  function handleSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const trip = e.target.querySelector("select");
    const data = Object.fromEntries([...new FormData(e.currentTarget)]);
    data.id = Date.now();
    data.packed = false;
    if (data.quantity && data.description) handleAddItems(data);
    input.value = "";
    trip.value = 1;
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>What do you need for yout trip?</h3>
      <select name="quantity">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
      <input name="description" type="text" placeholder="item..." />
      <button>Add</button>
    </form>
  );
}