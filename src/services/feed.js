import gql from 'graphql-tag';
import { Like } from './like';

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
    }
  }
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
