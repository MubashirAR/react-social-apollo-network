import React, { useState, Fragment } from 'react';
import image from '../assets/img/social_networking.svg';
import avatar from '../assets/img/male_avatar.svg';
import './Friends.css';
import Navbar from './Navbar';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_LOGGED_IN_USER } from '../services/localCache/user';
import { GET_FRIENDS_QUERY, REMOVE_FRIEND_MUTATION, ACCEPT_FRIEND_MUTATION, REJECT_FRIEND_MUTATION, ADD_FRIEND_MUTATION } from '../services/friend';
import * as yup from 'yup';
import Form from 'react-formal';
import { GET_USER_QUERY } from '../services/auth';

export default () => {
  const modelSchema = yup.object({
    text: yup.string().required('Please enter some text'),
  });
  const [model, setModel] = useState({
    text: '',
  });
  // if (loading) return 'Loading...';
  // if (error) return 'Error: ' + error.message;
  const { data: friendsData, friendsError, friendsLoading, client, refetch } = useQuery(GET_FRIENDS_QUERY);
  const { data: searchData, error: searchError, loading: searchLoading, refetch: search } = useQuery(GET_USER_QUERY);
  const [removeFriend, { data, loading, error }] = useMutation(REMOVE_FRIEND_MUTATION);
  const [acceptFriend] = useMutation(ACCEPT_FRIEND_MUTATION);
  const [addFriend] = useMutation(ADD_FRIEND_MUTATION);
  const [rejectFriend] = useMutation(REJECT_FRIEND_MUTATION);
  const { loggedInUser } = client.readQuery({ query: GET_LOGGED_IN_USER });

  if (friendsLoading) return 'Loading...';
  if (friendsError) return 'Error: ' + friendsError.message;

  const removeFriendHandler = async ({ requestedById, requestedToId }) => {
    await removeFriend({
      variables: { requestedById, requestedToId },
    });
    search();
    refetch();
  };
  const addFriendHandler = async ({ requestedById, requestedToId }) => {
    await addFriend({
      variables: { requestedById, requestedToId },
    });
    search();
    refetch();
  };
  const acceptFriendHandler = async ({ requestedById, requestedToId }) => {
    await acceptFriend({
      variables: { requestedById, requestedToId },
    });
    search();
    refetch();
  };
  const rejectFriendHandler = async ({ requestedById, requestedToId }) => {
    await rejectFriend({
      variables: { requestedById, requestedToId },
    });
    search();
    refetch();
  };
  const submit = () => {
    search(model);
  };
  return (
    <>
      <Navbar loggedIn />
      <div className="friends pt-5">
        <div className="container">
          <h2>Search People</h2>
          <Form className="w-100" schema={modelSchema} value={model} onSubmit={(e) => submit()} onChange={(model) => setModel(model)}>
            <Form.Field className="form-control mt-3 w-100" name="text" placeholder="Find a friend"></Form.Field>
            <Form.Submit className="btn btn-primary mt-3" type="submit">
              Search
            </Form.Submit>
          </Form>
          <div className="jumbotron">
            {searchData &&
              searchData.users &&
              searchData.users
                .filter((u) => u.id !== loggedInUser.id)
                .map((u) => {
                  const sentToMe = u.FriendRequestsSent.filter((f) => {
                    return f.RequestedToId === loggedInUser.id && f.isActive && !f.isRejected;
                  });
                  const sentByMe = u.FriendRequestsReceived.filter((f) => {
                    return f.RequestedById === loggedInUser.id && f.isActive && !f.isRejected;
                  });
                  const accepted = [...sentByMe, ...sentToMe].filter((f) => f.isAccepted);
                  if (accepted[0]) {
                    u.isFriend = true;
                    u.friendRequest = accepted[0];
                  } else if (sentToMe.length) {
                    u.hasRequestedMe = true;
                  } else if (sentByMe.length) {
                    u.isRequestedByMe = true;
                  }
                  return u;
                })
                .map((user) => (
                  <div className="card">
                    <div className="card-header">
                      <img src={avatar} className="img-thumbnail mr-2"></img>
                      {user.name}
                      {user.hasRequestedMe ? (
                        <div>
                          <button
                            className="btn btn-success ml-5"
                            onClick={(_) => acceptFriendHandler({ requestedById: user.id, requestedToId: loggedInUser.id })}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger ml-5"
                            onClick={(_) => rejectFriendHandler({ requestedById: user.id, requestedToId: loggedInUser.id })}
                          >
                            Reject
                          </button>
                        </div>
                      ) : user.isFriend ? (
                        <button
                          className="btn btn-danger ml-5"
                          onClick={(_) => removeFriendHandler({ requestedById: user.friendRequest.RequestedById, requestedToId: user.friendRequest.RequestedToId })}
                        >
                          Remove Friend
                        </button>
                      ) : user.isRequestedByMe ? (
                        <button
                          className="btn btn-secondary ml-5"
                          disabled
                        >
                          Requested
                        </button>
                      ) : (
                        <button
                          className="btn btn-success ml-5"
                          onClick={(_) => addFriendHandler({ requestedById: loggedInUser.id, requestedToId: user.id })}
                        >
                          Add Friend
                        </button>
                      )}
                    </div>
                    {/* <div className="card-body"></div> */}
                  </div>
                ))}
          </div>
          <h2>My Friends</h2>
          <div className="jumbotron">
            {friendsData &&
              friendsData.friends &&
              friendsData.friends
                .filter((f) => f.isActive && f.isAccepted)
                .map((friend) => (
                  <div className="card">
                    <div className="card-header">
                      <div>
                        <img src={avatar} className="img-thumbnail mr-2"></img>
                        {friend.RequestedById === loggedInUser.id ? friend.RequestedTo.name : friend.RequestedBy.name}
                      </div>
                      <button
                        className="btn btn-danger ml-5"
                        onClick={(_) => removeFriendHandler({ RequestedById: friend.RequestedById, RequestedToId: friend.RequestedToId })}
                      >
                        Remove Friend
                      </button>
                    </div>
                    {/* <div className="card-body"></div> */}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};
