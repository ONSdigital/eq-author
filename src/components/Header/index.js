import React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "constants/theme";

import { raiseToast } from "redux/toast/actions";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import IconLink from "components/IconLink";
import ButtonGroup from "components/ButtonGroup";
import Breadcrumb from "components/Breadcrumb";
import UserProfile from "components/UserProfile";
import IconButton from "components/IconButton";

import { Grid, Column } from "components/Grid";
import { getUser } from "redux/auth/reducer";
import { signOutUser } from "redux/auth/actions";

import logo from "./logo.svg";

import shareIcon from "./icon-share.svg?inline";

import previewIcon from "./icon-preview.svg?inline";

const StyledHeader = styled.header`
  height: 4em;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  background-color: ${colors.darkGrey};
  color: ${colors.white};
  font-weight: 400;
  padding: 1em 1.5em;
`;

const buttonStyles = css`
  height: 3.5rem;
  width: 3.5rem;
  padding: 0.5rem;
`;

const PreviewLink = styled(IconLink)`
  ${buttonStyles};
`;

const ShareButton = styled(IconButton)`
  justify-content: center;
  ${buttonStyles};

  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;

export const StyledUserProfile = styled(UserProfile)`
  ${buttonStyles};
  width: auto;
`;

export const Logo = styled(Link)`
  color: white;
  position: relative;
  text-decoration: none;
`;

export const UtilityBtns = styled(ButtonGroup)`
  justify-content: flex-end;
  align-items: center;
`;

export class UnconnectedHeader extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    user: CustomPropTypes.user,
    signOutUser: PropTypes.func.isRequired,
    raiseToast: PropTypes.func.isRequired
  };

  displayToast = () => {
    this.props.raiseToast("ShareToast", "Preview link copied to clipboard");
  };
  getPreviewUrl(questionnaireId) {
    const timestamp = Date.now();
    const publisherUrl = process.env.REACT_APP_PUBLISHER_URL;
    const goLaunchASurveyQuickLaunchUrl =
      process.env.REACT_APP_GO_LAUNCH_A_SURVEY_URL;
    const urlEncodedParam = encodeURIComponent(
      `${publisherUrl}/${questionnaireId}?r=${timestamp}`
    );
    return `${goLaunchASurveyQuickLaunchUrl}?url=${urlEncodedParam}`;
  }

  handleSignOut = () => {
    this.props.signOutUser();
  };

  handleShare = () => {
    const textField = document.createElement("textarea");
    textField.innerText = this.getPreviewUrl(this.props.questionnaire.id);
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    this.displayToast();
  };

  render() {
    const { questionnaire } = this.props;
    return (
      <StyledHeader>
        <Grid align="center">
          <Column cols={2}>
            <Logo to="/" data-test="logo">
              <img src={logo} alt="Author" />
            </Logo>
          </Column>

          <Column>
            {questionnaire && <Breadcrumb title={questionnaire.title} />}
          </Column>

          <Column>
            <UtilityBtns horizontal>
              {questionnaire && (
                <React.Fragment>
                  <PreviewLink
                    href={this.getPreviewUrl(questionnaire.id)}
                    icon={previewIcon}
                    title="Preview"
                    target="_blank"
                  />
                  <ShareButton
                    test="Share"
                    icon={shareIcon}
                    title="Share"
                    iconOnly
                    onClick={this.handleShare}
                    highlightOnHover={false}
                  >
                    Create link for sharing
                  </ShareButton>
                </React.Fragment>
              )}
              {this.props.user && (
                <StyledUserProfile
                  user={this.props.user}
                  onSignOut={this.handleSignOut}
                />
              )}
            </UtilityBtns>
          </Column>
        </Grid>
      </StyledHeader>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
});

export default connect(mapStateToProps, { signOutUser, raiseToast })(
  UnconnectedHeader
);
