import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";

import Field from "components/Forms/Field";
import EntityToolbar from "components/EntityToolbar";
import RichTextEditor from "components/RichTextEditor";
import ConnectedCanvasSection from "components/EditorSurface/CanvasSection";
import DeleteConfirmDialog from "components/DeleteConfirmDialog";
import iconSection from "./icon-dialog-section.svg";

import getIdForObject from "utils/getIdForObject";
import withEntityEditor from "components/withEntityEditor";
import sectionFragment from "graphql/fragments/section.graphql";
import { flip, partial } from "lodash";
import getTextFromHTML from "utils/getTextFromHTML";

const titleControls = {
  emphasis: true
};

const descriptionControls = {
  bold: true,
  emphasis: true
};

const Padding = styled.div`
  padding: 0 2em 2em;
`;

const SectionCanvas = styled(ConnectedCanvasSection)`
  padding: 0;
`;

export class UnwrappedSectionEditor extends React.Component {
  state = {
    showDeleteConfirmDialog: false
  };

  handleOpenDeleteConfirmDialog = () =>
    this.setState({ showDeleteConfirmDialog: true });

  handleCloseDeleteConfirmDialog = () =>
    this.setState({ showDeleteConfirmDialog: false });

  handleDeleteSectionConfirm = () => {
    const { onDeleteSection, section } = this.props;
    onDeleteSection(section.id);
  };

  render() {
    const { section, onUpdate, onChange } = this.props;
    const handleUpdate = partial(flip(onChange), onUpdate);
    const sectionTitleText = getTextFromHTML(section.title);

    return (
      <SectionCanvas id={getIdForObject(section)}>
        <EntityToolbar onDelete={this.handleOpenDeleteConfirmDialog} />
        <DeleteConfirmDialog
          isOpen={this.state.showDeleteConfirmDialog}
          onClose={this.handleCloseDeleteConfirmDialog}
          onDelete={this.handleDeleteSectionConfirm}
          title={sectionTitleText || "Untitled Section"}
          alertText="All questions in this section will also be removed. This may affect piping and routing rules elsewhere."
          icon={iconSection}
        />
        <Padding>
          <Field id="title">
            <RichTextEditor
              placeholder="Section title"
              value={section.title}
              ref={this.setTitleRef}
              onUpdate={handleUpdate}
              label="title"
              controls={titleControls}
              size="large"
              testSelector="txt-section-title"
              autoFocus={!sectionTitleText}
            />
          </Field>
          <Field id="description">
            <RichTextEditor
              placeholder="Enter a description (optional)…"
              value={section.description}
              onUpdate={handleUpdate}
              label="description"
              controls={descriptionControls}
              multiline
              testSelector="txt-section-description"
            />
          </Field>
        </Padding>
      </SectionCanvas>
    );
  }
}

UnwrappedSectionEditor.propTypes = {
  section: CustomPropTypes.section.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDeleteSection: PropTypes.func.isRequired,
  titleRef: PropTypes.func
};

export default withEntityEditor("section", sectionFragment)(
  UnwrappedSectionEditor
);
