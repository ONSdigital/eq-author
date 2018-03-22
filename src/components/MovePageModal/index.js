import React from "react";
import Modal from "components/Modal";
import styled from "styled-components";
import DialogHeader from "components/Dialog/DialogHeader";
import { Message, Heading } from "components/Dialog/DialogMessage";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import SectionSelectModal from "./SectionSelectModal";
import PositionSelectModal from "./PositionSelectModal";
import { find, reject, parseInt } from "lodash";
import getTextFromHTML from "utils/getTextFromHTML";
import Icon from "assets/icon-select.svg";

const StyledModal = styled(Modal)`
  .Modal {
    width: 25em;
  }
`;

const moveTo = (array, item, position) => {
  array = reject(array, item);
  array.splice(position, 0, item);

  return array;
};

const CenteredHeading = styled(Heading)`
  text-align: center;
  margin-bottom: 1rem;
`;

const Label = styled.p`
  font-size: 0.875em;
  font-weight: bold;
  margin-bottom: 0.25rem;
  margin-top: 1.25rem;
`;

const Trigger = styled.button.attrs({ type: "button" })`
  width: 100%;
  font-size: 0.875em;
  padding: 0.5rem;
  background: white url('${Icon}') no-repeat right 0.5em center;
  border: solid 1px #aeaeae;
  text-align: left;
  border-radius: 3px;
`;

class MovePageModal extends React.Component {
  static propTypes = {
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    questionnaire: CustomPropTypes.questionnaire.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onMovePage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isSectionSelectOpen: false,
      isPagePositionOpen: false,
      selectedSectionId: props.section.id,
      selectedPagePosition: props.page.position
    };
  }

  handleToggleSectionSelect = () => {
    this.setState({ isSectionSelectOpen: !this.state.isSectionSelectOpen });
  };

  handleTogglePagePosition = () => {
    this.setState({ isPagePositionOpen: !this.state.isPagePositionOpen });
  };

  handleSectionSelect = ({ value }) => {
    this.setState({
      selectedSectionId: value,
      selectedPagePosition: 0,
      isSectionSelectOpen: false
    });
  };

  handlePositionSelect = ({ value }) => {
    this.setState({ selectedPagePosition: parseInt(value) });
  };

  handlePageMove = e => {
    const { page, onMovePage, onClose } = this.props;
    const { selectedSectionId, selectedPagePosition } = this.state;

    e.preventDefault();

    this.setState({ isPagePositionOpen: false }, () => {
      onMovePage({
        id: page.id,
        sectionId: selectedSectionId,
        position: selectedPagePosition
      });
      onClose();
    });
  };

  getSection() {
    const { questionnaire } = this.props;
    const { selectedSectionId } = this.state;

    return find(questionnaire.sections, { id: selectedSectionId });
  }

  getPages(section) {
    return moveTo(
      section.pages,
      this.props.page,
      this.state.selectedPagePosition
    );
  }

  render() {
    const { isOpen, onClose, questionnaire } = this.props;
    const {
      isPagePositionOpen,
      isSectionSelectOpen,
      selectedPagePosition
    } = this.state;

    const section = this.getSection();
    const pages = this.getPages(section);

    return (
      <StyledModal isOpen={isOpen} onClose={onClose}>
        <DialogHeader>
          <Message>
            <CenteredHeading>Move question</CenteredHeading>
          </Message>
        </DialogHeader>
        <Label>Section</Label>
        <Trigger onClick={this.handleToggleSectionSelect}>
          {getTextFromHTML(section.title)}
        </Trigger>
        <SectionSelectModal
          isOpen={isSectionSelectOpen}
          onClose={this.handleToggleSectionSelect}
          onChange={this.handleSectionSelect}
          sections={questionnaire.sections}
          selectedSection={section}
        />
        <Label>Position</Label>
        <Trigger onClick={this.handleTogglePagePosition}>Select</Trigger>
        <PositionSelectModal
          isOpen={isPagePositionOpen}
          onClose={this.handleTogglePagePosition}
          onChange={this.handlePositionSelect}
          onConfirm={this.handlePageMove}
          pages={pages}
          selectedPosition={selectedPagePosition}
        />
      </StyledModal>
    );
  }
}

export default MovePageModal;
