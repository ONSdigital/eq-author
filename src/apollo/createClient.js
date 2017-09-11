import { ApolloClient } from "react-apollo";
import fragmentMatcher from "./fragmentMatcher";
import getIdFromObject from "utils/getIdFromObject";

export default networkInterface => {
  return new ApolloClient({
    addTypename: true,
    dataIdFromObject: getIdFromObject,
    fragmentMatcher,
    networkInterface
  });
};
