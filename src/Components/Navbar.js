import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default props => {
  const { loggedIn } = props;
  const url = window.location.href;
  const parts = url.split('/');
  let page = '';
  if (parts.length > 3) {
    page = parts[3];
  }
  return (
    <>
      {loggedIn ? (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light ">
          <div className="container">
            <a className="navbar-brand" href="/feed">
              React Social
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className={classNames({ 'nav-item': true, 'nav-link': true, 'active': page === 'feed' })} to="/feed">
                  Feed
                </Link>
                <Link className={classNames({ 'nav-item': true, 'nav-link': true, 'active': page === 'friends' })} to="/friends">
                  Friends
                </Link>
                <Link className="btn btn-danger ml-5" to="/">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container">
            <a className="navbar-brand" href="/">
              React Social
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-item nav-link" to="/register">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};
