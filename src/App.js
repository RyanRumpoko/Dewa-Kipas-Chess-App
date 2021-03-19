import './App.css';
import { Route, Switch } from 'react-router-dom'
import Login from './pages/Login';
import ChessPVP from './pages/ChessPVP';
import ChessVSBot from './pages/ChessVSBot';

function App() {
  return (
    <div>
      <div className="row nav">
        <nav className="col" >
          <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <li>Home</li>
            <li>Login</li>
          </ul>
        </nav>
      </div>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/pvp">
            <ChessPVP />
          </Route>
          <Route path="/bot">
            <ChessPVP />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
