import React from "react";
import styled, { css } from "styled-components";
import { colors } from "constants/theme";
import { lighten } from "polished";
import PropTypes from "prop-types";

const textStyle = lighten(0.1, colors.darkBlue);
const codeStyle = lighten(0.1, colors.blue);

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

const DialogMessage = props => {
  const { heading, subheading, description } = props;

  return (
    <Message>
      <Heading>{heading}</Heading>
      <Subheading>{subheading}</Subheading>
      <Description>{description}</Description>
    </Message>
  );
};

DialogMessage.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  description: PropTypes.string
};

export default DialogMessage;
