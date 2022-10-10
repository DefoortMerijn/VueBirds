import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'http://[::1]:3066/graphql', //TODO: get right url
})

export default () => {
  return {
    apolloClient,
  }
}
