import React from 'react';
import image from '../assets/img/social_networking.svg';
import avatar from '../assets/img/male_avatar.svg';
import './Friends.css';
import Navbar from './Navbar';
import { useQuery } from '@apollo/react-hooks';
import { GET_LOGGED_IN_USER } from '../services/localCache/user';
import { GET_FRIENDS_QUERY } from '../services/friend';

export default () => {
  // const { client, data, loading, error } = useQuery(GET_LOGGED_IN_USER);
  // if (loading) return 'Loading...';
  // if (error) return 'Error: ' + error.message;
  const { data: friendsData, friendsError, friendsLoading } = useQuery(GET_FRIENDS_QUERY);
  if (friendsLoading) return 'Loading...';
  if (friendsError) return 'Error: ' + friendsError.message;
  return (
    <>
      <Navbar loggedIn />
      <div className="friends pt-5">
        <h2>My Friends</h2>
        <div className="jumbotron">
          {friendsData &&
            friendsData.friends &&
            friendsData.friends.map((friend) => (
              <div className="card">
                <div className="card-header">
                  <img src={avatar} className="img-thumbnail mr-2"></img>
                  {friend.RequestedBy.name}
                  <button className="btn btn-danger ml-5">Remove Friend</button>
                </div>
                {/* <div className="card-body"></div> */}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
