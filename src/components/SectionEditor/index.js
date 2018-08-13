import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";

import RichTextEditor from "components/RichTextEditor";
import DeleteConfirmDialog from "components/DeleteConfirmDialog";
import iconSection from "./icon-dialog-section.svg";

import getIdForObject from "utils/getIdForObject";
import withEntityEditor from "components/withEntityEditor";
import sectionFragment from "graphql/fragments/section.graphql";
import { flip, partial } from "lodash";

import MoveSectionModal from "components/MoveSectionModal";
import MoveSectionQuery from "components/MoveSectionModal/MoveSectionQuery";

const titleControls = {
  emphasis: true
};

const Padding = styled.div`
  padding: 0 2em 2em;
`;

const SectionCanvas = styled.div`
  padding: 0;
`;

export class UnwrappedSectionEditor extends React.Component {
  static propTypes = {
    section: CustomPropTypes.section.isRequired,
    onChange: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDeleteSectionConfirm: PropTypes.func.isRequired,
    onCloseDeleteConfirmDialog: PropTypes.func.isRequired,
    showDeleteConfirmDialog: PropTypes.bool.isRequired,
    onMoveSectionDialog: PropTypes.func.isRequired,
    showMoveSectionDialog: PropTypes.bool.isRequired,
    onCloseMoveSectionDialog: PropTypes.func.isRequired,
    match: CustomPropTypes.match
  };

  renderMoveSectionModal = ({ loading, error, data }) => {
    const {
      onMoveSectionDialog,
      showMoveSectionDialog,
      onCloseMoveSectionDialog,
      section
    } = this.props;

    if (loading || error) {
      return null;
    }
    return (
      <MoveSectionModal
        questionnaire={data.questionnaire}
        isOpen={showMoveSectionDialog}
        onClose={onCloseMoveSectionDialog}
        onMoveSection={onMoveSectionDialog}
        section={section}
      />
    );
  };

  render() {
    const {
      section,
      onUpdate,
      onChange,
      showDeleteConfirmDialog,
      onCloseDeleteConfirmDialog,
      onDeleteSectionConfirm,
      match
    } = this.props;
    const handleUpdate = partial(flip(onChange), onUpdate);
    const sectionTitleText = section.plaintextTitle;

    return (
      <SectionCanvas data-test="section-editor" id={getIdForObject(section)}>
        <DeleteConfirmDialog
          isOpen={showDeleteConfirmDialog}
          onClose={onCloseDeleteConfirmDialog}
          onDelete={onDeleteSectionConfirm}
          title={sectionTitleText || "Untitled Section"}
          alertText="All questions in this section will also be removed. This may affect piping and routing rules elsewhere."
          icon={iconSection}
          data-test="dialog-delete-confirm"
        />
        <MoveSectionQuery questionnaireId={match.params.questionnaireId}>
          {this.renderMoveSectionModal}
        </MoveSectionQuery>
        <Padding>
          <RichTextEditor
            id="title"
            label="Title"
            value={section.title}
            onUpdate={handleUpdate}
            controls={titleControls}
            size="large"
            testSelector="txt-section-title"
            autoFocus={!sectionTitleText}
          />
        </Padding>
      </SectionCanvas>
    );
  }
}

UnwrappedSectionEditor.fragments = {
  Section: sectionFragment
};

export default withEntityEditor("section", sectionFragment)(
  UnwrappedSectionEditor
);
