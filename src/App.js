import './App.css';
import Login from './pages/Login';
import ChessPVP from './pages/ChessPVP';
import ChessVSBot from './pages/ChessVSBot';
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Regis from "./pages/Regis";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <div className="row nav">
        <nav className="col">
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <li>Home</li>
            <li>Login</li>
          </ul>
        </nav>
      </div>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              localStorage.access_token ? <Home /> : <Redirect to="/login" />
            }
          ></Route>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/pvp">
            <ChessPVP />
          </Route>
          <Route path="/bot">
            <ChessPVP />
          </Route>
          <Route path="/register">
            <Regis />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
