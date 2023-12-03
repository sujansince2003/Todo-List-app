import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [isErrormsg, setisErrormsg] = useState(false);
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
          <ErrorMsg isErrormsg={isErrormsg} />
          <Heading />
          <Form AddtoList={AddtoList} />
          <ListUi
            items={items}
            delItem={delItem}
            toggleItem={toggleItem}
            setisErrormsg={setisErrormsg}
          />
        </div>
      </div>
    </>
  );
}
function ErrorMsg({ isErrormsg }) {
  return (
    <>
      {isErrormsg ? (
        <div className="errormsg">
          <span>No Any Task is completed</span>
        </div>
      ) : null}
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

function ListUi({ items, delItem, toggleItem, setisErrormsg }) {
  const itemnum = items.length;
  const completedarr = items.filter((item) => item.completed);
  const notcompletedarr = items.filter((item) => !item.completed);
  console.log(notcompletedarr);
  const notcompleted = notcompletedarr.length;
  const [sortBy, setsortBy] = useState("all");
  const [clearCompleted, setclearCompleted] = useState(false);

  let sortedItems = items;
  if (clearCompleted) sortedItems = notcompletedarr;
  else {
    if (sortBy === "all") sortedItems = items;
    if (sortBy === "completed") sortedItems = completedarr;

    if (sortBy === "active") sortedItems = notcompletedarr;
  }

  return (
    <div className="alllists">
      <ul className={itemnum >= 7 ? "alllistsul" : ""}>
        {sortedItems.map((item) => (
          <List
            key={item.id}
            item={item}
            delItem={delItem}
            toggleItem={toggleItem}
            setsortBy={setsortBy}
          />
        ))}
      </ul>
      <Actions
        itemnum={itemnum}
        items={items}
        setsortBy={setsortBy}
        notcompleted={notcompleted}
        setclearCompleted={setclearCompleted}
      />
    </div>
  );
}
function List({ item, delItem, toggleItem, setsortBy }) {
  const [isHover, setisHover] = useState(false);

  function onHover() {
    setisHover(() => !isHover);
  }
  return (
    <li className="list" onMouseEnter={onHover} onMouseLeave={onHover}>
      <span>
        <input
          type="checkbox"
          onChange={() => {
            toggleItem(item.id);
            setsortBy("all");
          }}
          checked={item.completed ? true : false}
        />
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
function Actions({
  itemnum,
  items,
  setsortBy,
  notcompleted,
  setclearCompleted,
}) {
  return (
    <div className="actions">
      {itemnum === 0 ? (
        <p>Add the task from input field</p>
      ) : (
        <>
          <div className="numitems">
            <span>{itemnum} tasks added</span>
            {notcompleted === 0 ? (
              <span>All tasks are completed</span>
            ) : (
              <span>{notcompleted} tasks left to complete</span>
            )}
          </div>

          <div className="normal-actions-btn">
            <button
              className="action-btn"
              onClick={() => setsortBy(() => "all")}
            >
              All
            </button>
            <button
              className="action-btn"
              onClick={() => setsortBy(() => "active")}
            >
              Active
            </button>
            <button
              className="action-btn"
              onClick={() => setsortBy("completed")}
            >
              Completed
            </button>
          </div>
          <div className="clearbtn">
            <button
              className="action-btn action-btn-clear"
              onClick={() => setclearCompleted(true)}
            >
              Clear Completed
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default App;
