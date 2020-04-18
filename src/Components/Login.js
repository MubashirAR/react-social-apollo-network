import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
export default () => {
  return (
    <>
      <Navbar />
      <div className="jumbotron">
        <div className="card">
          <div className="card-header">
            <h2>Login</h2>
          </div>
          <div className="card-body">
            <input placeholder="username" type="text" className="form-control"></input>
            <input placeholder="password" type="text" className="form-control mt-3"></input>
            <Link className="btn btn-primary mt-3 px-5 py-2" to="/feed">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
