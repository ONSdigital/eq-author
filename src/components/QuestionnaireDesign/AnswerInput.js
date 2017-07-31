import React from "react";
import withChangeHandler from "components/Forms/withChangeHandler";
import { flow } from "lodash";

const Input = props => <input type="text" {...props} />;

export default flow(withChangeHandler)(Input);
