import "./App.css";

function App() {
  return (
    <>
      <form>
        <input type="text" />
      </form>

      <div className="alllists">
        <ul>
          <li>
            <input type="checkbox" />
            <span>Helllo</span>
            <span
              className="xmark"
              onClick={() => {
                alert("hello");
              }}
            >
              ╳
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
