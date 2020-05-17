import gql from 'graphql-tag';
import { User } from './auth';
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

const REMOVE_FRIEND_MUTATION = gql`
  mutation removeFriend($requestedById: Int, $requestedToId: Int){
    removeFriend(RequestedById: $requestedById, RequestedToId: $requestedToId) {
      isRejected
      isActive
      isAccepted
    }
  }
`;

const ADD_FRIEND_MUTATION = gql`
  mutation addFriend($requestedById: Int, $requestedToId: Int){
    addFriend(RequestedById: $requestedById, RequestedToId: $requestedToId) {
      isRejected
      isActive
      isAccepted
    }
  }
`;

const ACCEPT_FRIEND_MUTATION = gql`
  mutation acceptFriend($requestedById: Int, $requestedToId: Int){
    acceptFriend(RequestedById: $requestedById, RequestedToId: $requestedToId) {
      isRejected
      isActive
      isAccepted
    }
  }
`;

const REJECT_FRIEND_MUTATION = gql`
  mutation rejectFriend($requestedById: Int, $requestedToId: Int){
    rejectFriend(RequestedById: $requestedById, RequestedToId: $requestedToId) {
      isRejected
      isActive
      isAccepted
    }
  }
`;

export { GET_FRIENDS_QUERY, REMOVE_FRIEND_MUTATION, ACCEPT_FRIEND_MUTATION, REJECT_FRIEND_MUTATION, ADD_FRIEND_MUTATION };
