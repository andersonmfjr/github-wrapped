import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

// Not sure what this does. See https://tinyurl.com/y93u9k5k.
const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

/**
 * Before every request, get the user's GitHub API token
 */
const authMiddleware = new ApolloLink((operation, forward) => {
  // Add the token to the request context
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ADD_YOUR_TOKEN_HERE`,
    },
  }));

  return forward(operation);
});

/**
 * Apollo client to make calls to GitHub graphQL
 */
const apollo = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default apollo;
