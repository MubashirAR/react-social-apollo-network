import gql from 'graphql-tag';

const GET_LOGGED_IN_USER = gql`
  {
    loggedInUser @client {
      id
      name
    }
  }
`;
export { GET_LOGGED_IN_USER };
