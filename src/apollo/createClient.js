import { ApolloClient } from "react-apollo";
import fragmentMatcher from "./fragmentMatcher";
import getIdForObject from "utils/getIdForObject";

export default networkInterface => {
  return new ApolloClient({
    addTypename: true,
    dataIdFromObject: getIdForObject,
    fragmentMatcher,
    networkInterface
  });
};
