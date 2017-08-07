import React from "react";
import withSeamlessness from "../QuestionnaireDesign/withSeamlessness";
import withChangeHandler from "components/Forms/withChangeHandler";
import { flow } from "lodash";

const Input = ({ ...otherProps }) => <input type="text" {...otherProps} />;

export default flow(withChangeHandler, withSeamlessness)(Input);
