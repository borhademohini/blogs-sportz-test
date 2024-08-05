import './App.css';

function App() {
  const todos = [
    "list of already created live blogs",
    "create new blog",
    "deleting the live blog",
    "publish/unpublish",
    "open the “Blog Details” page.",
    "Create a new post.",
    "embed a post from Facebook",
    "Twitter using their embed codes.",
    "scrapes the meta information of the link and displays the relevant meta data."
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
