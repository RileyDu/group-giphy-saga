import FavList from "../FavView/FavList";
import Form from "../SearchView/Form";
import List from "../SearchView/List";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/">
        <header className="App-header">
          <h1 className="App-title w3-container w3-center w3-animate-top" >GIPHY SEARCH</h1>
          <ul>
            <nav>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/favorites">FAVORITE GIFS</Link>
              </li>
            </nav>
          </ul>
        </header>
      </Route>
      <Route path="/" exact>
        <Form />
        <List />
      </Route>
      <Route path="/favorites">
        <FavList />
      </Route>
    </Router>
  );
}

export default App;
