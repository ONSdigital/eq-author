import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { colors } from "constants/theme";
import { connect } from "react-redux";
import { isOnline } from "redux/saving/reducer";
import WarningIcon from "./icon-warning.svg?inline";
import { TransitionGroup } from "react-transition-group";
import ExpansionTransition from "components/ExpansionTransition";
import IconText from "components/IconText";

const Banner = styled.div`
  background-color: ${colors.red};
  height: 2.5em;
  justify-content: center;
  display: flex;
`;

const StyledExpansionTransition = styled(ExpansionTransition)`
  &.expansion-exit,
  &.expansion-exit.expansion-exit-active {
    > :first-child {
      visibility: hidden;
    }
  }
`;

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const WarningMessage = styled(IconText)`
  align-items: center;
  display: flex;
  color: ${colors.white};
  animation: ${fade} 750ms ease-in forwards;
`;

export const UnconnectedOfflineBanner = props => {
  return (
    <TransitionGroup>
      {!props.isOnline && (
        <StyledExpansionTransition finalHeight="2.5em">
          <Banner>
            <WarningMessage icon={WarningIcon}>
              You&apos;re currently offline and any changes you make won&apos;t
              be saved. Check your connection and try again.
            </WarningMessage>
          </Banner>
        </StyledExpansionTransition>
      )}
    </TransitionGroup>
  );
};

UnconnectedOfflineBanner.propTypes = {
  isOnline: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isOnline: isOnline(state)
});

export default connect(mapStateToProps)(UnconnectedOfflineBanner);
