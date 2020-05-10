import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import gql from 'graphql-tag';
import { GET_LOGGED_IN_USER } from './services/localCache/user';
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'graphql',
  credentials: 'same-origin'
})
const client = new ApolloClient({
  cache,
  link,
  resolvers: {
    Query: {
      loggedInUser: (_root, variables, { cache, getCacheKey }) => {
        const fragment = gql`
          fragment user on loggedInUser {
            id
          }
        `;
        const id = getCacheKey({ id: 1 })
        const data = cache.readQuery(GET_LOGGED_IN_USER)
        return data;
      }
    }
  }
})
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
