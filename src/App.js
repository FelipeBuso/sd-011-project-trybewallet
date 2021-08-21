import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/trybewallet" component={ Login } />
        <Route path="/trybewallet/carteira" component={ Wallet } />
      </Switch>
    </div>
  );
}

export default App;
