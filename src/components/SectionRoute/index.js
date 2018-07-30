import React from "react";
import CustomPropTypes from "custom-prop-types";
import PropTypes from "prop-types";
import { flowRight, isFunction, isNil } from "lodash";

import SectionQuery from "./SectionQuery";
import SectionEditor from "components/SectionEditor";
import IconButtonDelete from "components/IconButtonDelete";
import { Toolbar, Buttons } from "components/EditorToolbar";
import IconMove from "components/EditorToolbar/icon-move.svg?inline";
import Button from "components/Button";
import IconText from "components/IconText";

import withDeleteSection from "containers/enhancers/withDeleteSection";
import withUpdateSection from "containers/enhancers/withUpdateSection";
import withCreatePage from "containers/enhancers/withCreatePage";
import withCreateSection from "containers/enhancers/withCreateSection";
import withMoveSection from "containers/enhancers/withMoveSection";

import getTextFromHTML from "utils/getTextFromHTML";
import { Titled } from "react-titled";
import Loading from "components/Loading";
import Error from "components/Error";
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { raiseToast } from "redux/toast/actions";
import EditorLayout from "components/EditorLayout";

export class UnwrappedSectionRoute extends React.Component {
  static propTypes = {
    match: CustomPropTypes.match,
    onUpdateSection: PropTypes.func.isRequired,
    onDeleteSection: PropTypes.func.isRequired,
    onAddPage: PropTypes.func.isRequired,
    onMoveSection: PropTypes.func.isRequired,
    error: PropTypes.object, // eslint-disable-line
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      section: CustomPropTypes.section
    })
  };

  state = {
    showDeleteConfirmDialog: false,
    showMoveSectionDialog: false
  };

  handleOpenMoveSectionDialog = () => {
    this.setState({ showMoveSectionDialog: true });
  };

  handleCloseMoveSectionDialog = cb => {
    this.setState({ showMoveSectionDialog: false }, isFunction(cb) ? cb : null);
  };

  handleMoveSection = args => {
    this.handleCloseMoveSectionDialog(() => this.props.onMoveSection(args));
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
    const { params: { sectionId } } = match;

    this.handleCloseDeleteConfirmDialog(() => onDeleteSection(sectionId));
  };

  handleAddPage = () => {
    const { params: { sectionId } } = this.props.match;
    this.props.onAddPage(sectionId, 0);
  };

  getSectionTitle = section => title => {
    const sectionTitle = getTextFromHTML(section.title) || "Untitled section";
    return `${sectionTitle} - ${title}`;
  };

  renderContent() {
    const { loading, error, data } = this.props;

    if (loading) {
      return <Loading height="24.25rem">Section loading…</Loading>;
    }
    if (error) {
      return <Error>Something went wrong</Error>;
    }
    if (isNil(data.section)) {
      return <Error>Oops! Section could not be found</Error>;
    }

    return (
      <Titled title={this.getSectionTitle(data.section)}>
        <Toolbar>
          <Buttons>
            <Button
              onClick={this.handleOpenMoveSectionDialog}
              data-test="btn-move"
              variant="tertiary"
              small
            >
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
        <SectionEditor
          key={data.section.id} // this is needed to reset the state of the RichTextEditors when moving between sections
          section={data.section}
          onUpdate={this.props.onUpdateSection}
          showDeleteConfirmDialog={this.state.showDeleteConfirmDialog}
          onCloseDeleteConfirmDialog={this.handleCloseDeleteConfirmDialog}
          onDeleteSectionConfirm={this.handleDeleteSectionConfirm}
          showMoveSectionDialog={this.state.showMoveSectionDialog}
          onCloseMoveSectionDialog={this.handleCloseMoveSectionDialog}
          onMoveSectionDialog={this.handleMoveSection}
          {...this.props}
        />
      </Titled>
    );
  }

  render() {
    return (
      <EditorLayout onAddPage={this.handleAddPage} data-test="section-route">
        {this.renderContent()}
      </EditorLayout>
    );
  }
}

const withSectionEditing = flowRight(
  connect(null, { raiseToast }),
  withApollo,
  withCreateSection,
  withUpdateSection,
  withDeleteSection,
  withCreatePage,
  withMoveSection
);

export default withSectionEditing(props => (
  <SectionQuery id={props.match.params.sectionId}>
    {innerProps => <UnwrappedSectionRoute {...innerProps} {...props} />}
  </SectionQuery>
));
