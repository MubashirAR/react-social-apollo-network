import React from 'react';
import chatting from '../assets/img/chatting.svg';
import addFriends from '../assets/img/add_friends.svg';
import feed from '../assets/img/friends_feed.svg';
import devices from '../assets/img/all_devices.svg';
import social from '../assets/img/social_networking.svg';
import Navbar from './Navbar';
import { Link  } from "react-router-dom";

export default () => {
  return (
    <>
      <Navbar/>
      <section className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-6 jumbo-img">
              <img src={social} />
            </div>
            <div className="col-md-6 jumbo-text">
              <h2>React social is a place to get in touch</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="jumbotron jumbotron-fluid jumbotron-blue">
        <div className="container">
          <div className="row">
            <div className="col-md-6 jumbo-text">
              <h2>Connect with your friends</h2>
            </div>
            <div className="col-md-6 jumbo-img">
              <img src={addFriends} />
            </div>
          </div>
        </div>
      </section>
      <section className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-6 jumbo-img">
              <img src={feed} />
            </div>
            <div className="col-md-6 jumbo-text">
              <h2>Check what everyone's upto</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="jumbotron jumbotron-fluid jumbotron-blue">
        <div className="container">
          <div className="row">
            <div className="col-md-6 jumbo-text">
              <h2>Chat with your friends!</h2>
            </div>
            <div className="col-md-6 jumbo-img">
              <img src={chatting} />
            </div>
          </div>
        </div>
      </section>
      <section className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-6 jumbo-img">
              <img src={devices} />
            </div>
            <div className="col-md-6 jumbo-text">
              <h2>Connect from anywhere, anytime</h2>
            </div>
            <div className="join-btn">
              <Link className="btn btn-primary" to="/register">Join Now!</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
