import { useState } from "react";
import "./App.css";

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
          <ListUi items={items} delItem={delItem} toggleItem={toggleItem} />
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

function List({ item, delItem, toggleItem }) {
  const [isHover, setisHover] = useState(false);

  function onHover() {
    setisHover(() => !isHover);
  }
  return (
    <li className="list" onMouseEnter={onHover} onMouseLeave={onHover}>
      <span>
        <input type="checkbox" onChange={() => toggleItem(item.id)} />
        <span
          className="description"
          style={item.completed ? { textDecoration: "line-through" } : null}
        >
          {item.description}
        </span>
      </span>

      <span className="xmark" onClick={() => delItem(item.id)}>
        {isHover ? " ╳" : ""}
      </span>
    </li>
  );
}

function ListUi({ items, delItem, toggleItem }) {
  const itemnum = items.length;
  return (
    <div className="alllists">
      <ul className={itemnum >= 7 ? "alllistsul" : ""}>
        {items.map((item) => (
          <List
            key={item.id}
            item={item}
            delItem={delItem}
            toggleItem={toggleItem}
          />
        ))}
      </ul>
      <Actions itemnum={itemnum} items={items} />
    </div>
  );
}
function Actions({ itemnum, items }) {
  const notcompleted = items.filter((item) => !item.completed).length;

  return (
    <div className="actions">
      {itemnum === 0 ? (
        <p>Add the task from input field</p>
      ) : (
        <>
          <div className="numitems">
            <span>{itemnum} items added</span>
            <span>{notcompleted} item left to complete</span>
          </div>

          <div className="normal-actions-btn">
            <button className="action-btn">All</button>
            <button className="action-btn">Active</button>
            <button className="action-btn">Completed</button>
          </div>
          <div className="clearbtn">
            <button className="action-btn action-btn-clear">
              Clear Completed
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default App;
