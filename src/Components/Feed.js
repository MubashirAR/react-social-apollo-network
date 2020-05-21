import React, { useState } from 'react';
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
import { ADD_COMMENT_MUTATION } from '../services/comment';

export default () => {
  const [comment, setComment] = useState({});
  const { client } = useQuery(GET_LOGGED_IN_USER);
  const { loggedInUser } = client.readQuery({ query: GET_LOGGED_IN_USER });

  const { data, error, loading, refetch } = useQuery(GET_FEED_QUERY);
  const [likePost, { error: likeError, loading: likeLoading }] = useMutation(ADD_LIKE_MUTATION);
  const [addComment] = useMutation(ADD_COMMENT_MUTATION);
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
    refetch();
  };
  const unlike = async ({ postId }) => {
    await unlikePost({
      variables: {
        likedById: loggedInUser.id,
        postId,
      },
    });
    refetch();
  };
  const addCommentHandler = async ({ originalPostId, commentedOn }) => {
    await addComment({
      variables: {
        text: comment[originalPostId],
        commentedOn,
        originalPostId,
        commentById: loggedInUser.id,
      },
    });
  };
  const showComment = (comment) => (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-header">
            <img src={avatar} className="img-thumbnail mr-2"></img>
            <b>{comment.CommentBy && comment.CommentBy.name}</b> {comment.text} <br />
            {comment.likes.filter((l) => l.isActive).length} likes
            {showLikeButton(comment)}
          </div>
        </div>
      </div>
    </div>
  );
  const showLikeButton = (p) => {
    return p.likes.find((like) => {
      return like.isActive && like.LikedById === loggedInUser.id;
    }) ? (
      <button className="btn btn-primary" type="submit" onClick={(_) => unlike({ postId: p.id })}>
        Unlike
      </button>
    ) : (
      <button className="btn btn-outline-primary" type="submit" onClick={(_) => like({ postId: p.id })}>
        Like
      </button>
    );
  };
  return (
    <>
      <Navbar loggedIn />
      <div className="feed">
        <div className="jumbotron">
          <NewPost refetchData={refetchData} />
          <h2>My Feed</h2>
          {data.feed.map((p) => (
            <div className="card" key={p.id}>
              <div className="card-header">
                <img src={avatar} className="img-thumbnail mr-2"></img>
                <b>{p.CreatedBy.name}</b> {p.text}
              </div>
              <div className="card-body">
                {/* <img className="post-img" src={image}></img> */}
                {p.likes.filter((l) => l.isActive).length} Likes
                {showLikeButton(p)}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add Comment"
                    aria-label="Add Comment"
                    aria-describedby="button-addon2"
                    onChange={(e) => setComment({ ...comment, [p.id]: e.target.value })}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      id="button-addon2"
                      onClick={(_) => addCommentHandler({ originalPostId: p.id, commentedOn: 'post' })}
                    >
                      Button
                    </button>
                  </div>
                </div>
                {p.comments && p.comments.map((comment) => showComment(comment))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
