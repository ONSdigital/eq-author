import { createNetworkInterface } from "react-apollo";

export default createNetworkInterface({
  uri: process.env.REACT_APP_API_URL
});
