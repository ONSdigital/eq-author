import { ApolloClient, createNetworkInterface } from "react-apollo";

const client = new ApolloClient({
  ddTypename: true,
  dataIdFromObject: result => {
    if (result.id && result.__typename) {
      // eslint-disable-line no-underscore-dangle
      return result.__typename + result.id;
      // eslint-disable-line no-underscore-dangle
    }
    return null;
  },
  networkInterface: createNetworkInterface({
    uri: "http://localhost:4000/graphiql"
  })
});

export default client;
