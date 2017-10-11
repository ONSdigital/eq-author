import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "constants/theme";

import CustomPropTypes from "custom-prop-types";
import IconButton from "components/IconButton";
import IconLink from "components/IconLink";
import ButtonGroup from "components/ButtonGroup";
import Breadcrumb from "components/Breadcrumb";

import { Grid, Column } from "components/Grid";

import logo from "./logo.svg";
import exportIcon from "./icon-export.svg";
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
`;

class Header extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire
  };

  render() {
    const { questionnaire } = this.props;
    let previewUrl;
    if (questionnaire) {
      const timestamp = Date.now();
      const publisherUrl = "http://docker.for.mac.localhost:9000/publish"; // TODO Get from process.env
      const goLaunchASurveyQuickLaunchUrl =
        "http://localhost:8000/quick-launch"; // TODO Get from process.env
      const urlEncodedParam = encodeURIComponent(
        `${publisherUrl}/${questionnaire.id}?r=${timestamp}`
      );
      previewUrl = `${goLaunchASurveyQuickLaunchUrl}?url=${urlEncodedParam}`;
    }
    return (
      <StyledHeader>
        <Grid align="center">
          <Column cols={2}>
            <Logo to="/">
              <img src={logo} alt="Dahl" />
            </Logo>
          </Column>

          <Column>
            {questionnaire && <Breadcrumb title={questionnaire.title} />}
          </Column>

          <Column>
            {questionnaire && (
              <UtilityBtns horizontal>
                <IconLink
                  href={previewUrl}
                  icon={previewIcon}
                  title="Preview"
                  target="_blank"
                />
                <IconButton icon={exportIcon} title="Export" disabled />
              </UtilityBtns>
            )}
          </Column>
        </Grid>
      </StyledHeader>
    );
  }
}

export default Header;
