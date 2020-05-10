import gql from 'graphql-tag';

const User = {
  fragments: {
    user: gql`
      fragment UserFragment on User {
        id
        name
        email
        mobile
        dob
      }
    `,
  },
};

const REGISTER_USER_MUTATION = gql`
  mutation($name: String!, $email: String!, $mobile: Int!, $dob: Date) {
    addUser(name: $name, email: $email, mobile: $mobile, dob: $dob) {
      id
      name
      email
      mobile
      dob
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserFragment
    }
  }
  ${User.fragments.user}
`;
const GET_USER_QUERY = gql`
  query getUser($email: String!) {
    user(email: $email) {
      id
      name
      mobile
      dob
    }
  }
`;

const register = async data => {
  const resp = await fetch('register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(resp.ok){
    const data = await resp.json();
    return data;
  }
  throw await resp.json();
}

const login = async data => {
  const resp = await fetch('login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(resp.ok){
    const data = await resp.json();
    return data;
  }
  throw await resp.json();
}
export { REGISTER_USER_MUTATION, LOGIN_MUTATION, GET_USER_QUERY, User, register, login };
