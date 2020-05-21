import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Feed from './Components/Feed';
import Register from './Components/Register';
import Friends from './Components/Friends';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <Router>
      <div className="App">
        <ErrorBoundary key={window.location.pathname}>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/feed" component={Feed}></Route>
            <Route exact path="/friends" component={Friends}></Route>
          </Switch>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
