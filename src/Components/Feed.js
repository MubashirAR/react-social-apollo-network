import React from 'react';
import { Link } from "react-router-dom";
import image from '../assets/img/social_networking.svg';
import avatar from '../assets/img/male_avatar.svg';
import './Feed.css';
import Navbar from './Navbar';

export default () => {
  return (
    <>
    <Navbar loggedIn/>
      <div className="feed">
        <h2>My Feed</h2>
        <div className="jumbotron">
          <div className="card">
            <div className="card-header">
              <img src={avatar} className="img-thumbnail mr-2"></img>
              Had an awesome time at the beach!
            </div>
            <div className="card-body">
              <img className="post-img" src={image}></img>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <img src={avatar} className="img-thumbnail mr-2"></img>
              Had an awesome time at the beach!
            </div>
            <div className="card-body">
              <img className="post-img" src={image}></img>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <img src={avatar} className="img-thumbnail mr-2"></img>
              Had an awesome time at the beach!
            </div>
            <div className="card-body">
              <img className="post-img" src={image}></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
