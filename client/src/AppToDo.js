import './App.css';

function App() {
  const todos = [
    "updates in real-time",
    "switch between the blogs",
    "UI Layout depending on the type of post"
  ];
  return (
    <div className="App">
      <ul>
        {todos.map((todo) => {
          return (
            <li>{todo}</li>
          )
        })}

      </ul>
    </div>
  );
}

export default App;
