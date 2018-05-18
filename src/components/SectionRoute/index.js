import React from "react";
import CustomPropTypes from "custom-prop-types";
import PropTypes from "prop-types";
import { flowRight, isFunction, isNil } from "lodash";

import Tabs from "components/Tabs";
import SectionQuery from "./SectionQuery";
import SectionEditor from "components/SectionEditor";
import IconButtonDelete from "components/IconButtonDelete";
import { Toolbar, Buttons } from "components/EditorSurface/Toolbar";
import IconMove from "../EditorSurface/icon-move.svg?inline";
import Button from "components/Button";
import IconText from "components/IconText";

import withDeleteSection from "containers/enhancers/withDeleteSection";
import withUpdateSection from "containers/enhancers/withUpdateSection";
import getTextFromHTML from "utils/getTextFromHTML";
import { Titled } from "react-titled";

export class UnwrappedSectionRoute extends React.Component {
  static propTypes = {
    match: CustomPropTypes.match,
    onUpdateSection: PropTypes.func.isRequired,
    onDeleteSection: PropTypes.func.isRequired
  };

  state = {
    showDeleteConfirmDialog: false
  };

  handleOpenDeleteConfirmDialog = () =>
    this.setState({ showDeleteConfirmDialog: true });

  handleCloseDeleteConfirmDialog = cb =>
    this.setState(
      { showDeleteConfirmDialog: false },
      isFunction(cb) ? cb : null
    );

  handleDeleteSectionConfirm = () => {
    const { onDeleteSection, match } = this.props;
    const { params: { pageId, sectionId } } = match;

    this.handleCloseDeleteConfirmDialog(() =>
      onDeleteSection(sectionId, pageId)
    );
  };

  getSectionTitle(section) {
    return getTextFromHTML(section.title) || "Untitled section";
  }

  renderSectionEditor = ({ loading, error, data }) => {
    const { onUpdateSection } = this.props;

    if (loading) {
      return "loading";
    }

    if (error || isNil(data.section)) {
      return "Ooops";
    }

    return (
      <Titled
        title={title => `${this.getSectionTitle(data.section)} - ${title}`}
      >
        <SectionEditor
          section={data.section}
          onUpdate={onUpdateSection}
          showDeleteConfirmDialog={this.state.showDeleteConfirmDialog}
          onCloseDeleteConfirmDialog={this.handleCloseDeleteConfirmDialog}
          onDeleteSectionConfirm={this.handleDeleteSectionConfirm}
        />
      </Titled>
    );
  };

  render() {
    const { match } = this.props;

    return (
      <Tabs>
        <Toolbar>
          <Buttons>
            <Button data-test="btn-move" variant="tertiary" small disabled>
              <IconText icon={IconMove}>Move</IconText>
            </Button>
            <IconButtonDelete
              onClick={this.handleOpenDeleteConfirmDialog}
              data-test="btn-delete"
            >
              Delete
            </IconButtonDelete>
          </Buttons>
        </Toolbar>
        <SectionQuery id={match.params.sectionId}>
          {this.renderSectionEditor}
        </SectionQuery>
      </Tabs>
    );
  }
}

export default flowRight(withUpdateSection, withDeleteSection)(
  UnwrappedSectionRoute
);
