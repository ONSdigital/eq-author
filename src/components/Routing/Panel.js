import { colors, shadow } from "constants/theme";

import styled from "styled-components";

const Panel = styled.div`
  background-color: ${colors.white};
  box-shadow: ${shadow};
  padding: ${props => (props.foo ? "0.5em 1.5em" : "1em")};
  margin-bottom: 1px;
`;

export default Panel;
