import gql from 'graphql-tag';

const Like = {
  fragment: {
    like: gql`
      fragment likeFragment on Like {
        id
        isActive
        likedType
        CommentId
        PostId
        LikedById
      }
    `,
  },
};

const ADD_LIKE_MUTATION = gql`
  mutation addLike($likedType: String, $postId: Int, $likedById: Int, $commentId: Int) {
    addLike(likedType: $likedType, PostId: $postId, LikedById: $likedById, CommentId: $commentId) {
      isActive
      LikedById
      PostId
      likedType
    }
  }
`;
const REMOVE_LIKE_MUTATION = gql`
  mutation addLike($postId: Int, $likedById: Int, $commentId: Int) {
    removeLike(PostId: $postId, LikedById: $likedById, CommentId: $commentId) {
      isActive
      LikedById
      PostId
    }
  }
`;

export { Like, ADD_LIKE_MUTATION, REMOVE_LIKE_MUTATION };
