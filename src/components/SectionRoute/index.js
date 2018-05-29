import React from "react";
import styled from "styled-components";
import CustomPropTypes from "custom-prop-types";
import PropTypes from "prop-types";
import { flowRight, isFunction, isNil } from "lodash";

import Tabs from "components/Tabs";
import SectionQuery from "./SectionQuery";
import SectionEditor from "components/SectionEditor";
import IconButtonDelete from "components/IconButtonDelete";
import { Toolbar, Buttons } from "components/EditorToolbar";
import IconMove from "components/EditorToolbar/icon-move.svg?inline";
import Button from "components/Button";
import IconText from "components/IconText";

import MainCanvas from "components/MainCanvas";
import ScrollPane from "components/ScrollPane";
import PropertiesPanel from "components/PropertiesPanel";
import AddPage from "components/QuestionnaireDesignPage/icon-add-page.svg?inline";
import SavingIndicator from "components/SavingIndicator";
import { Grid, Column } from "components/Grid";

import withDeleteSection from "containers/enhancers/withDeleteSection";
import withUpdateSection from "containers/enhancers/withUpdateSection";
import withCreatePage from "containers/enhancers/withCreatePage";
import withCreateSection from "containers/enhancers/withCreateSection";
import getTextFromHTML from "utils/getTextFromHTML";
import { Titled } from "react-titled";
import Loading from "components/Loading";
import Error from "components/Error";
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { raiseToast } from "redux/toast/actions";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4em;
`;

const Margin = styled.div`
  margin-top: 2em;
`;

export class UnwrappedSectionRoute extends React.Component {
  static propTypes = {
    match: CustomPropTypes.match,
    onUpdateSection: PropTypes.func.isRequired,
    onDeleteSection: PropTypes.func.isRequired,
    onAddPage: PropTypes.func.isRequired,
    error: PropTypes.object, // eslint-disable-line
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      section: CustomPropTypes.section
    })
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
      return <Loading height="11.8125em">Section loading…</Loading>;
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
        <SectionEditor
          section={data.section}
          onUpdate={this.props.onUpdateSection}
          showDeleteConfirmDialog={this.state.showDeleteConfirmDialog}
          onCloseDeleteConfirmDialog={this.handleCloseDeleteConfirmDialog}
          onDeleteSectionConfirm={this.handleDeleteSectionConfirm}
        />
      </Titled>
    );
  }

  render() {
    return (
      <Grid data-test="section-route">
        <Column gutters={false}>
          <ScrollPane permanentScrollBar>
            <Margin>
              <MainCanvas>
                <SavingIndicator />
                <Tabs>{this.renderContent()}</Tabs>
              </MainCanvas>
            </Margin>
            <Centered>
              <Button
                variant="tertiary"
                small
                onClick={this.handleAddPage}
                data-test="btn-add-page-2"
              >
                <IconText icon={AddPage}>Add question page</IconText>
              </Button>
            </Centered>
          </ScrollPane>
        </Column>
        <Column cols={2} gutters={false}>
          <PropertiesPanel />
        </Column>
      </Grid>
    );
  }
}

const withSectionEditing = flowRight(
  connect(null, { raiseToast }),
  withApollo,
  withCreateSection,
  withUpdateSection,
  withDeleteSection,
  withCreatePage
);

export default withSectionEditing(props => (
  <SectionQuery id={props.match.params.sectionId}>
    {innerProps => <UnwrappedSectionRoute {...innerProps} {...props} />}
  </SectionQuery>
));
