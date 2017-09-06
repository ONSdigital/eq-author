import styled from "styled-components";
import AutoResizeTextArea from "react-textarea-autosize";
import withSeamlessness from "../EditingSurface/withSeamlessness";
import withChangeHandler from "components/Forms/withChangeHandler";
import { flow } from "lodash";

const TextArea = styled(AutoResizeTextArea)`
  resize: none;
`;

export default flow(withChangeHandler, withSeamlessness)(TextArea);
