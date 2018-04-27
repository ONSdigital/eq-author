import React from "react";
import Modal from "components/Modal";
import styled from "styled-components";
import DialogHeader from "components/Dialog/DialogHeader";
import { Message, Heading } from "components/Dialog/DialogMessage";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import ItemSelectModal from "./ItemSelectModal";
import { find, reject, parseInt, uniqueId } from "lodash";
import getTextFromHTML from "utils/getTextFromHTML";
import Icon from "assets/icon-select.svg";
import ItemSelect, { Option } from "./ItemSelect";

import { colors } from "constants/theme";
import Truncated from "../Truncated";

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
  color: ${colors.text};
`;

const Label = styled.label`
  display: block;
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 0.25rem;
  margin-top: 1.25rem;
`;

const Trigger = styled.button.attrs({ type: "button" })`
  width: 100%;
  font-size: 1em;
  padding: 0.5rem;
  padding-right: 2em;
  background: white url('${Icon}') no-repeat right center;
  border: solid 1px #aeaeae;
  text-align: left;
  border-radius: 3px;
  color: ${colors.black};

  &:focus {
    box-shadow: 0 0 0 3px ${colors.tertiary}, inset 0 0 0 1px ${colors.primary};
    outline: none;
  }
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
      selectedPagePosition: props.page.position,
      previousSelectedSectionId: null,
      previousSelectedPagePosition: null
    };
  }

  handleCloseSectionSelect = () => {
    this.setState({
      isSectionSelectOpen: false,
      selectedSectionId: this.state.previousSelectedSectionId
    });
  };

  handleOpenSectionSelect = () => {
    this.setState({
      isSectionSelectOpen: true,
      previousSelectedSectionId: this.state.selectedSectionId
    });
  };

  handleClosePagePosition = () => {
    this.setState({
      isPagePositionOpen: false,
      selectedPagePosition: this.state.previousSelectedPagePosition
    });
  };

  handleOpenPagePosition = () => {
    this.setState({
      isPagePositionOpen: true,
      previousSelectedPagePosition: this.state.selectedPagePosition
    });
  };

  handleSectionChange = ({ value }) => {
    this.setState({
      selectedSectionId: value
    });
  };

  handleSectionConfirm = e => {
    e.preventDefault();

    this.setState({
      isSectionSelectOpen: false,
      selectedPagePosition: 0
    });
  };

  handlePositionChange = ({ value }) => {
    this.setState({ selectedPagePosition: parseInt(value) });
  };

  handlePositionConfirm = e => {
    const { page, section, onMovePage } = this.props;
    const { selectedSectionId, selectedPagePosition } = this.state;

    e.preventDefault();

    this.setState({ isPagePositionOpen: false }, () =>
      onMovePage({
        from: {
          id: page.id,
          sectionId: section.id,
          position: page.position
        },
        to: {
          id: page.id,
          sectionId: selectedSectionId,
          position: selectedPagePosition
        }
      })
    );
  };

  getSelectedSection() {
    const { questionnaire } = this.props;
    const { selectedSectionId } = this.state;

    return find(questionnaire.sections, { id: selectedSectionId });
  }

  getPagesForSection(section) {
    return moveTo(
      section.pages,
      this.props.page,
      this.state.selectedPagePosition
    );
  }

  renderSectionSelect(section) {
    const { questionnaire } = this.props;
    const { isSectionSelectOpen } = this.state;

    return (
      <ItemSelectModal
        testId="section-modal"
        title="Section"
        isOpen={isSectionSelectOpen}
        onClose={this.handleCloseSectionSelect}
        onConfirm={this.handleSectionConfirm}
      >
        <ItemSelect
          data-test="section-select"
          name="section"
          value={section.id}
          onChange={this.handleSectionChange}
        >
          {questionnaire.sections.map(section => (
            <Option key={section.id} value={section.id}>
              {getTextFromHTML(section.title) || "Untitled Section"}
            </Option>
          ))}
        </ItemSelect>
      </ItemSelectModal>
    );
  }

  renderPositionSelect(pages) {
    const { isPagePositionOpen, selectedPagePosition } = this.state;

    return (
      <ItemSelectModal
        testId="position-modal"
        title="Position"
        primaryText="Move page"
        isOpen={isPagePositionOpen}
        onClose={this.handleClosePagePosition}
        onConfirm={this.handlePositionConfirm}
      >
        <ItemSelect
          data-test="position-select"
          name="position"
          value={String(selectedPagePosition)}
          onChange={this.handlePositionChange}
        >
          {pages.map((page, i) => (
            <Option key={i} value={String(i)}>
              {getTextFromHTML(page.title) || "Untitled Page"}
            </Option>
          ))}
        </ItemSelect>
      </ItemSelectModal>
    );
  }

  render() {
    const { isOpen, onClose } = this.props;
    const section = this.getSelectedSection();
    const pages = this.getPagesForSection(section);

    const sectionButtonId = uniqueId("MovePageModal");
    const positionButtonId = uniqueId("MovePageModal");

    return (
      <StyledModal isOpen={isOpen} onClose={onClose} testId="move-page-modal">
        <DialogHeader>
          <Message>
            <CenteredHeading>Move question</CenteredHeading>
          </Message>
        </DialogHeader>

        <Label htmlFor={sectionButtonId}>Section</Label>
        <Trigger id={sectionButtonId} onClick={this.handleOpenSectionSelect}>
          <Truncated>
            {getTextFromHTML(section.title) || "Untitled Section"}
          </Truncated>
        </Trigger>
        {this.renderSectionSelect(section)}

        <Label htmlFor={positionButtonId}>Position</Label>
        <Trigger id={positionButtonId} onClick={this.handleOpenPagePosition}>
          Select
        </Trigger>
        {this.renderPositionSelect(pages)}
      </StyledModal>
    );
  }
}

export default MovePageModal;
