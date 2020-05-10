import gql from 'graphql-tag';
import { User } from "./auth";
const Friend = {
  fragments: {
    friend: gql`
      fragment FriendFragment on Friend {
        isActive
        isRejected
        isAccepted
        RequestedById
        RequestedToId
        RequestedBy {
          ...UserFragment
        }
        RequestedTo {
          ...UserFragment
        }
      }
      ${User.fragments.user}
    `,
  },
};

const GET_FRIENDS_QUERY = gql`
  query getFriends {
    friends {
      ...FriendFragment
    }
  }
  ${Friend.fragments.friend}
`;

export { GET_FRIENDS_QUERY };
