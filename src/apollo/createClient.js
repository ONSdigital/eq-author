import { ApolloClient } from "react-apollo";
import fragmentMatcher from "./fragmentMatcher";

export default networkInterface => {
  return new ApolloClient({
    addTypename: true,
    dataIdFromObject: result => {
      if (result.id && result.__typename) {
        // eslint-disable-line no-underscore-dangle
        return result.__typename + result.id;
        // eslint-disable-line no-underscore-dangle
      }
      return null;
    },
    fragmentMatcher,
    networkInterface
  });
};
