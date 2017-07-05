import styled from "styled-components";
import AutoResizeTextArea from "react-textarea-autosize";
import withSeamlessness from "./withSeamlessness";

const TextArea = styled(AutoResizeTextArea)`
  resize: none;
`;

export default withSeamlessness(TextArea);
