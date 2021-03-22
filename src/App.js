import "./App.css";
import Login from "./pages/Login";
// import ChessVSBot from "./pages/ChessVSBot";
import { Redirect, Route, Switch } from "react-router-dom";
import Regis from "./pages/Regis";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        {localStorage.access_token ? (
          <Redirect to="/home" />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route
        path="/login"
        render={() =>
          localStorage.access_token ? <Redirect to="/home" /> : <Login />
        }
      />
      <Route
        path="/home"
        render={() =>
          localStorage.access_token ? <Home /> : <Redirect to="/login" />
        }
      />
      <Route
        path="/dashboard/bot"
        render={() =>
          localStorage.access_token ? <Dashboard /> : <Redirect to="/login" />
        }
      />
      <Route
        path="/dashboard/:loc/:roomid"
        render={() =>
          localStorage.access_token ? <Dashboard /> : <Redirect to="/login" />
        }
      />
      <Route
        path="/dashboard/:loc/:roomid"
        render={() =>
          localStorage.access_token ? <Dashboard /> : <Redirect to="/login" />
        }
      />
      <Route
        path="/register"
        render={() =>
          localStorage.access_token ? <Redirect to="/home" /> : <Regis />
        }
      />
    </Switch>
  );
}

export default App;
