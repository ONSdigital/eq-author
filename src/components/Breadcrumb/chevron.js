import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ChevronSvg = props => (
  <svg width="10px" height="12px" viewBox="47 10 5 7" version="1.1">
    <polyline
      id="Combined-Shape"
      stroke={props.chevronColor}
      strokeWidth="1"
      fill="none"
      opacity="0.521338619"
      transform="translate(49.153996, 13.750000) rotate(-270.000000) translate(-49.153996, -13.750000) "
      points="51.8986355 15 49.1539961 12.5 46.4093567 15"
    />
  </svg>
);

ChevronSvg.propTypes = {
  chevronColor: PropTypes.string
};

ChevronSvg.defaultProps = {
  chevronColor: "#000"
};

const StyledSpan = styled.span`
  margin: 16px;
`;

export default props => {
  return (
    <StyledSpan>
      <ChevronSvg {...props} />
    </StyledSpan>
  );
};
