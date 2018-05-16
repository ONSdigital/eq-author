import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { colors } from "constants/theme";
import SectionNav from "components/NavigationSidebar/SectionNav";
import NavigationHeader from "components/NavigationSidebar/NavigationHeader";
import ScrollPane from "components/ScrollPane";

const Container = styled.div`
  background: ${colors.darkBlue};
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const NavigationScrollPane = styled(ScrollPane)`
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: ${colors.lightGrey};
    }
  }
`;

class NavigationSidebar extends Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire.isRequired,
    onAddPage: PropTypes.func.isRequired,
    onAddSection: PropTypes.func.isRequired,
    onUpdateQuestionnaire: PropTypes.func.isRequired
  };

  handleAddSection = () => {
    this.props.onAddSection(this.props.questionnaire.id);
  };

  render() {
    const { questionnaire, onUpdateQuestionnaire, onAddPage } = this.props;

    return (
      <Container data-test="side-nav">
        <NavigationHeader
          questionnaire={questionnaire}
          onUpdateQuestionnaire={onUpdateQuestionnaire}
          onAddSection={this.handleAddSection}
          onAddPage={onAddPage}
          data-test="nav-section-header"
        />
        <NavigationScrollPane>
          <SectionNav questionnaire={questionnaire} />
        </NavigationScrollPane>
      </Container>
    );
  }
}

export default NavigationSidebar;
