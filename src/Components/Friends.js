import React from 'react';
import image from '../assets/img/social_networking.svg';
import avatar from '../assets/img/male_avatar.svg';
import './Friends.css';
import Navbar from './Navbar';

export default () => {
  return (
    <>
      <Navbar loggedIn />
      <div className="friends pt-5">
        <h2>My Friends</h2>
        <div className="jumbotron">
          <div className="card">
            <div className="card-header">
              <img src={avatar} className="img-thumbnail mr-2"></img>
              Mubashir Reshamwala
              <button className="btn btn-danger ml-5">Remove Friend</button>
            </div>
            {/* <div className="card-body">
                        
                    </div> */}
          </div>
          <div className="card">
            <div className="card-header">
              <img src={avatar} className="img-thumbnail mr-2"></img>
              Mubashir Reshamwala
              <button className="btn btn-danger ml-5">Remove Friend</button>
            </div>
            {/* <div className="card-body">
                        
                    </div> */}
          </div>
          <div className="card">
            <div className="card-header">
              <img src={avatar} className="img-thumbnail mr-2"></img>
              Mubashir Reshamwala
              <button className="btn btn-danger ml-5">Remove Friend</button>
            </div>
            {/* <div className="card-body">
                        
                    </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
