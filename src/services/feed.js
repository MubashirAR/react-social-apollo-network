import gql from 'graphql-tag';
import { Like } from './like';
const commentFragment = gql`
  fragment commentFragment on Comment {
    text
    CommentById
    CommentBy {
      name
    }
    likes {
      id
      isActive
      LikedById
    }
  }
`;
const GET_FEED_QUERY = gql`
  query getFeed {
    feed {
      id
      text
      CreatedById
      postType
      OriginalPostId
      isActive
      likes {
        ...likeFragment
      }
      CreatedBy {
        id
        name
      }
      comments {
        ...commentFragment
        comments {
          ...commentFragment
        }
      }
    }
  }
  ${commentFragment}
  ${Like.fragment.like}
`;
const GET_FEED_QUERY_CACHE = gql`
  query getFeed {
    feed @client {
      text
      likes {
        ...likeFragment
      }
    }
  }
  ${Like.fragment.like}
`;

export { GET_FEED_QUERY, GET_FEED_QUERY_CACHE };
