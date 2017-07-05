import React from "react";
import withSeamlessness from "./withSeamlessness";

const Input = props => <input type="text" {...props} />;

export default withSeamlessness(Input);
