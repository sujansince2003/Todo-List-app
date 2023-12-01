import "./App.css";
const items = [
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
  return (
    <>
      <div
        className="container"
        style={{
          backgroundImage: `url("assetss/images/bg-desktop-light.jpg")`,
        }}
      >
        <div className="main">
          <div className="heading">
            <h1>TODO</h1>
            <span>🌙</span>
          </div>
          <form className="add-form">
            <input
              type="text"
              className="inputnbtn"
              placeholder="Enter the task here"
            />
            <button type="submit" className=" addbtn">
              Add
            </button>
          </form>

          <div className="alllists">
            <ul>
              {items.map((item) => (
                <List key={item.id} item={item} />
              ))}
            </ul>
          </div>
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
