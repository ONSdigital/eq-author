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

  render() {
    const { match, onUpdateSection } = this.props;

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
          {({ loading, error, data }) => {
            if (loading) {
              return "loading";
            }

            if (error || isNil(data.section)) {
              return "Ooops";
            }

            return (
              <SectionEditor
                section={data.section}
                onUpdate={onUpdateSection}
                showDeleteConfirmDialog={this.state.showDeleteConfirmDialog}
                onCloseDeleteConfirmDialog={this.handleCloseDeleteConfirmDialog}
                onDeleteSectionConfirm={this.handleDeleteSectionConfirm}
              />
            );
          }}
        </SectionQuery>
      </Tabs>
    );
  }
}

export default flowRight(withUpdateSection, withDeleteSection)(
  UnwrappedSectionRoute
);
