import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/img/social_networking.svg';
import avatar from '../assets/img/male_avatar.svg';
import './Feed.css';
import Navbar from './Navbar';
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
// import { LOGIN_MUTATION, GET_USER_QUERY } from '../services/auth';
import { GET_LOGGED_IN_USER } from '../services/localCache/user';
import { GET_FEED_QUERY } from '../services/feed';
import { ADD_LIKE_MUTATION, REMOVE_LIKE_MUTATION } from '../services/like';
import NewPost from './NewPost';

export default () => {
  // const client = useApolloClient();
  // const store = client.store.getCache();
  // let user;
  // try {
  //   user = store.readQuery({ query: GET_USER_QUERY });
  // } catch (error) {}
  // const { client, data } = useQuery(GET_LOGGED_IN_USER);
  // console.log({data})
  const { client } = useQuery(GET_LOGGED_IN_USER);
  const { loggedInUser } = client.readQuery({ query: GET_LOGGED_IN_USER });

  const { data, error, loading, refetch } = useQuery(GET_FEED_QUERY);
  const [likePost, { error: likeError, loading: likeLoading }] = useMutation(ADD_LIKE_MUTATION);
  const [unlikePost] = useMutation(REMOVE_LIKE_MUTATION);
  if (loading) {
    return 'loading...';
  }
  if (error) {
    console.log({ error });
    return 'error';
  }
  const refetchData = () => {
    refetch();
  };
  const like = async ({ postId }) => {
    await likePost({
      variables: {
        likedById: loggedInUser.id,
        postId,
        likedType: 'post',
      },
    });
    refetch()
  };
  const unlike = async ({ postId }) => {
    await unlikePost({
      variables: {
        likedById: loggedInUser.id,
        postId
      },
    });
    refetch()
  };
  return (
    <>
      <Navbar loggedIn />
      <div className="feed">
        <div className="jumbotron">
          <NewPost refetchData={refetchData} />
          <h2>My Feed</h2>
          {data.feed.map((p) => (
            <div className="card">
              <div className="card-header">
                <img src={avatar} className="img-thumbnail mr-2"></img>
                <b>{p.CreatedBy.name}</b> {p.text}
              </div>
              <div className="card-body">
                {/* <img className="post-img" src={image}></img> */}
                {p.likes.filter(l => l.isActive).length} Likes
                {p.likes.find((like) => {
                  return like.isActive && like.LikedById === loggedInUser.id;
                }) ? (
                  <button class="btn btn-success" type="submit" onClick={(_) => unlike({ postId: p.id })}>
                    Unlike
                  </button>
                ) : (
                  <button class="btn btn-outline-success" type="submit" onClick={(_) => like({ postId: p.id })}>
                    Like
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
