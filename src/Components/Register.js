import React from 'react';
// import './Login.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
export default () => {
  return (
    <>
      <Navbar />
      <div className="jumbotron">
        <div className="card">
          <div className="card-header">
            <h2>Sign Up</h2>
          </div>
          <div className="card-body">
            <input placeholder="Name" type="text" className="form-control"></input>
            <input placeholder="Username" type="text" className="form-control mt-3"></input>
            <input placeholder="Mobile" type="number" className="form-control mt-3"></input>
            <input placeholder="Email" type="email" className="form-control mt-3"></input>
            <input placeholder="Password" type="text" className="form-control mt-3"></input>
            <input placeholder="Confirm password" type="text" className="form-control mt-3"></input>
            <Link className="btn btn-primary mt-3 px-5 py-2" to="/login">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
