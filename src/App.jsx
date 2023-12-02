import { useState } from "react";
import "./App.css";
const itemsw = [
  {
    id: 2,
    it: "read for 1 hour",
  },
  {
    id: 3,
    it: "i am sukdan",
  },
  {
    id: 4,
    it: "i am fdsj",
  },
];

function App() {
  const [items, setItems] = useState([]);
  function AddtoList(item) {
    setItems((items) => [...items, item]);
  }

  function delItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function toggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  return (
    <>
      <div
        className="container"
        style={{
          backgroundImage: `url("assetss/images/bg-desktop-light.jpg")`,
        }}
      >
        <div className="main">
          <Heading />
          <Form AddtoList={AddtoList} />
          <ListUi items={items} delItem={delItem} />
        </div>
      </div>
    </>
  );
}

function Heading() {
  return (
    <div className="heading">
      <h1>TODO</h1>
      <span>🌙</span>
    </div>
  );
}

function Form({ AddtoList }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const item = { description, id: Date.now(), completed: false };
    AddtoList(item);
    setDescription("");
  }
  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        className="inputnbtn"
        placeholder="Enter the task here"
        value={description}
        onChange={(e) => setDescription(() => e.target.value)}
      />
      <button type="submit" className=" addbtn">
        Add
      </button>
    </form>
  );
}

function List({ item, delItem }) {
  const [isHover, setisHover] = useState(false);

  function onHover() {
    setisHover(() => !isHover);
  }
  return (
    <li className="list" onMouseEnter={onHover} onMouseLeave={onHover}>
      <span>
        <input type="checkbox" />
        <span className="description">{item.description}</span>
      </span>

      <span className="xmark" onClick={() => delItem(item.id)}>
        {isHover ? " ╳" : ""}
      </span>
    </li>
  );
}

function ListUi({ items, delItem }) {
  return (
    <div className="alllists">
      <ul>
        {items.map((item) => (
          <List key={item.id} item={item} delItem={delItem} />
        ))}
      </ul>
    </div>
  );
}
export default App;
