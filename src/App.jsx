import "./App.css";
const items = [
  {
    id: 2,
    it: "i am sukan",
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
  return (
    <>
      <div className="main">
        <form className="add-form">
          <input type="text" className="inputnbtn" />
          <button className=" addbtn">Add</button>
        </form>

        <div className="alllists">
          <ul>
            {items.map((item) => (
              <List key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function List({ item }) {
  return (
    <li className="list">
      <span>
        <input type="checkbox" />
        <span className="description">{item.it}</span>
      </span>
      <span
        className="xmark"
        onClick={() => {
          alert("hello");
        }}
      >
        ╳
      </span>
    </li>
  );
}
export default App;
