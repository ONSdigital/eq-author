import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { colors } from "constants/theme";
import SectionNav from "components/NavigationSidebar/SectionNav";
import NavigationHeader from "components/NavigationSidebar/NavigationHeader";
import IconButton from "components/IconButton";
import PlusIcon from "./icon-plus.svg?inline";
import ScrollPane from "components/ScrollPane";

const navBackground = "#4A4A4A";
const textInverted = "#E1E1E1";

const Container = styled.div`
  background: ${navBackground};
  color: ${textInverted};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const AddSection = styled.div`
  background: ${navBackground};
  border-top: 1px solid #c3c3c3;
  padding: 0;
  position: sticky;
  z-index: 99999;
  bottom: 0;
  left: 0;
  flex: 0;
`;

export const AddSectionBtn = styled(IconButton)`
  cursor: pointer;
  background: none;
  border: none;
  padding: 1em 0.6em;
  font-weight: 600;
  font-size: 0.75rem;
  color: ${textInverted};

  &:hover {
    color: ${colors.white};
  }
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

  handleAddSectionClick = () => {
    this.props.onAddSection(this.props.questionnaire.id);
  };

  handleAddPage = (sectionId, position) => {
    this.props.onAddPage(sectionId, position);
  };

  render() {
    const { questionnaire, onUpdateQuestionnaire } = this.props;

    return (
      <Container data-test="side-nav">
        <NavigationHeader
          questionnaire={questionnaire}
          onUpdateQuestionnaire={onUpdateQuestionnaire}
        />
        <NavigationScrollPane>
          <SectionNav
            transitionDuration={200}
            questionnaire={questionnaire}
            onAddPage={this.handleAddPage}
          />
        </NavigationScrollPane>
        <AddSection>
          <AddSectionBtn
            icon={PlusIcon}
            clear
            onClick={this.handleAddSectionClick}
            highlightOnHover={false}
            data-test="btn-add-section"
          >
            Add section
          </AddSectionBtn>
        </AddSection>
      </Container>
    );
  }
}

export default NavigationSidebar;
