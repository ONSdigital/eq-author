import styled, { css } from "styled-components";
import { colors } from "constants/theme";
import { lighten } from "polished";
import DialogIcon from "components/Dialog/Icon";

const textStyle = lighten(0.1, colors.darkBlue);
const codeStyle = lighten(0.1, colors.blue);

export const Header = styled.header`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

const collapsed = css`
  padding: 0;
  margin: 0;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Heading = styled.h2`
  font-size: 1.2em;
  color: ${textStyle};
  ${collapsed};
`;

export const Subheading = styled.h3`
  color: ${codeStyle};
  ${collapsed};
  font-size: 1em;
  font-weight: normal;
`;

export const Description = styled.p`
  font-size: 0.9em;
  color: ${textStyle};
`;

export const Icon = styled(DialogIcon)`
  flex-grow: 0;
  margin-right: 1em;
`;
