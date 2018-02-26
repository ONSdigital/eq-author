import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "constants/theme";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import IconLink from "components/IconDecorated/IconLink";
import ButtonGroup from "components/ButtonGroup";
import Breadcrumb from "components/Breadcrumb";
import UserProfile from "components/UserProfile";

import { Grid, Column } from "components/Grid";
import { getUser } from "redux/auth/reducer";
import { signOutUser } from "redux/auth/actions";

import logo from "./logo.svg";

import previewIcon from "./icon-preview.svg";

const StyledHeader = styled.header`
  height: 4em;
  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  background-color: ${colors.darkGrey};
  color: ${colors.white};
  font-weight: 400;
  padding: 1em 1.5em;
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
    signOutUser: PropTypes.func.isRequired
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

  render() {
    const { questionnaire } = this.props;
    return (
      <StyledHeader>
        <Grid align="center">
          <Column cols={2}>
            <Logo to="/">
              <img src={logo} alt="Author" />
            </Logo>
          </Column>

          <Column>
            {questionnaire && <Breadcrumb title={questionnaire.title} />}
          </Column>

          <Column>
            <UtilityBtns horizontal>
              {questionnaire && (
                <IconLink
                  href={this.getPreviewUrl(questionnaire.id)}
                  icon={previewIcon}
                  title="Preview"
                  target="_blank"
                />
              )}
              {this.props.user && (
                <UserProfile
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

export default connect(mapStateToProps, { signOutUser })(UnconnectedHeader);
