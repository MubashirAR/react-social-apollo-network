import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Feed from './Components/Feed';
import Register from './Components/Register';
import Friends from './Components/Friends';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/feed" component={Feed}></Route>
        <Route exact path="/friends" component={Friends}></Route>
      </div>
    </Router>
  );
}

export default App;
