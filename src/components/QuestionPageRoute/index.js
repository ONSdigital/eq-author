import React from "react";
import { withApollo, Query } from "react-apollo";
import gql from "graphql-tag";
import CustomPropTypes from "custom-prop-types";
import PropTypes from "prop-types";
import { flowRight, isFunction, isNil, get } from "lodash";
import { Titled } from "react-titled";

import QuestionPageEditor from "components/QuestionPageEditor";
import IconButtonDelete from "components/IconButtonDelete";
import { Toolbar, Buttons } from "components/EditorToolbar";
import IconMove from "components/EditorToolbar/icon-move.svg?inline";
import IconCopy from "components/EditorToolbar/icon-copy.svg?inline";
import Button from "components/Button";
import IconText from "components/IconText";

import { connect } from "react-redux";
import { raiseToast } from "redux/toast/actions";

import withUpdatePage from "containers/enhancers/withUpdatePage";
import withUpdateAnswer from "containers/enhancers/withUpdateAnswer";
import withCreateAnswer from "containers/enhancers/withCreateAnswer";
import withDeleteAnswer from "containers/enhancers/withDeleteAnswer";
import withCreateOption from "containers/enhancers/withCreateOption";
import withUpdateOption from "containers/enhancers/withUpdateOption";
import withDeleteOption from "containers/enhancers/withDeleteOption";
import withCreateExclusive from "containers/enhancers/withCreateExclusive";
import withCreateOther from "containers/enhancers/withCreateOther";
import withDeleteOther from "containers/enhancers/withDeleteOther";
import withMovePage from "containers/enhancers/withMovePage";
import focusOnEntity from "utils/focusOnEntity";
import withDeletePage from "containers/enhancers/withDeletePage";
import Loading from "components/Loading";
import Error from "components/Error";
import withCreatePage from "containers/enhancers/withCreatePage";
import withDuplicatePage from "containers/enhancers/withDuplicatePage";

import EditorLayout from "components/EditorLayout";
import AliasEditor from "components/AliasEditor";

import withEntityEditor from "components/withEntityEditor";
import pageFragment from "graphql/fragments/page.graphql";
import { getProperties } from "redux/properties/reducer";
import { getQuestionPage } from "redux/page/reducer";
import { updateAdditionalInfo } from "redux/page/actions";

const Alias = flowRight(
  withApollo,
  withEntityEditor("page", pageFragment)
)(({ page, ...otherProps }) => (
  <AliasEditor value={page.alias} {...otherProps} />
));

export class UnwrappedQuestionPageRoute extends React.Component {
  static propTypes = {
    match: CustomPropTypes.match,
    onAddAnswer: PropTypes.func.isRequired,
    onDeletePage: PropTypes.func.isRequired,
    onAddPage: PropTypes.func.isRequired,
    onMovePage: PropTypes.func.isRequired,
    onDuplicatePage: PropTypes.func.isRequired,
    error: PropTypes.object, // eslint-disable-line
    loading: PropTypes.bool.isRequired,
    questionPage: CustomPropTypes.page,
    data: PropTypes.shape({
      questionPage: CustomPropTypes.page
    })
  };

  state = {
    showDeleteConfirmDialog: false,
    showMovePageDialog: false,
    hasError: false
  };

  handleOpenMovePageDialog = () => {
    this.setState({ showMovePageDialog: true });
  };

  handleCloseMovePageDialog = cb => {
    this.setState({ showMovePageDialog: false }, isFunction(cb) ? cb : null);
  };

  handleMovePage = args => {
    this.handleCloseMovePageDialog(() => this.props.onMovePage(args));
  };

  handleOpenDeleteConfirmDialog = () =>
    this.setState({ showDeleteConfirmDialog: true });

  handleCloseDeleteConfirmDialog = cb =>
    this.setState(
      { showDeleteConfirmDialog: false },
      isFunction(cb) ? cb : null
    );

  handleDeletePageConfirm = () => {
    const { onDeletePage, match } = this.props;
    const {
      params: { pageId, sectionId }
    } = match;

    this.handleCloseDeleteConfirmDialog(() => onDeletePage(sectionId, pageId));
  };

  handleAddPage = () => {
    const {
      match: { params },
      questionPage
    } = this.props;

    this.props.onAddPage(params.sectionId, questionPage.position + 1);
  };

  handleAddAnswer = answerType => {
    const { match, onAddAnswer } = this.props;

    return onAddAnswer(match.params.pageId, answerType).then(focusOnEntity);
  };

  handleDuplicatePage = e => {
    e.preventDefault();
    const { match, onDuplicatePage, questionPage } = this.props;

    onDuplicatePage({
      sectionId: match.params.sectionId,
      pageId: questionPage.id,
      position: questionPage.position + 1
    });
  };

  getPageTitle = page => title => {
    const pageTitle = page.displayName;
    return `${pageTitle} - ${title}`;
  };

  renderContent = () => {
    const {
      loading,
      error,
      onUpdatePage,
      properties,
      updateAdditionalInfo,
      questionPage
    } = this.props;

    if (loading) {
      return <Loading height="38rem">Page loading…</Loading>;
    }

    if (error) {
      return <Error>Something went wrong</Error>;
    }

    if (isNil(questionPage)) {
      return <Error>Something went wrong</Error>;
    }

    const { showMovePageDialog, showDeleteConfirmDialog } = this.state;

    return (
      <Titled title={this.getPageTitle(questionPage)}>
        <Toolbar>
          <Alias
            id="question-alias"
            page={questionPage}
            onUpdate={onUpdatePage}
          />
          <Buttons>
            <Button
              onClick={this.handleOpenMovePageDialog}
              data-test="btn-move"
              variant="tertiary"
              small
            >
              <IconText icon={IconMove}>Move</IconText>
            </Button>
            <Button
              onClick={this.handleDuplicatePage}
              data-test="btn-duplicate-page"
              variant="tertiary"
              small
            >
              <IconText icon={IconCopy}>Duplicate</IconText>
            </Button>
            <IconButtonDelete
              onClick={this.handleOpenDeleteConfirmDialog}
              data-test="btn-delete"
            >
              Delete
            </IconButtonDelete>
          </Buttons>
        </Toolbar>
        <QuestionPageEditor
          key={questionPage.id} // this is needed to reset the state of the RichTextEditors when moving between pages
          {...this.props}
          page={questionPage}
          showMovePageDialog={showMovePageDialog}
          onCloseMovePageDialog={this.handleCloseMovePageDialog}
          onMovePage={this.handleMovePage}
          showDeleteConfirmDialog={showDeleteConfirmDialog}
          onCloseDeleteConfirmDialog={this.handleCloseDeleteConfirmDialog}
          onDeletePageConfirm={this.handleDeletePageConfirm}
          onAddPage={this.handleAddPage}
          onAddAnswer={this.handleAddAnswer}
          properties={properties}
          updateAdditionalInfo={({ name, value }) => {
            updateAdditionalInfo(questionPage.id, name, value);
          }}
        />
      </Titled>
    );
  };

  render() {
    return (
      <EditorLayout
        onAddPage={this.handleAddPage}
        page={this.props.data.questionPage}
      >
        {this.renderContent()}
      </EditorLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  properties: getProperties(state, ownProps.match.params.pageId),
  questionPage: getQuestionPage(state, ownProps.match.params.pageId)
});

const withQuestionPageEditing = flowRight(
  connect(
    mapStateToProps,
    { raiseToast, updateAdditionalInfo }
  ),
  withApollo,
  withMovePage,
  withCreatePage,
  withUpdatePage,
  withDeletePage,
  withDuplicatePage,
  withUpdateAnswer,
  withCreateAnswer,
  withDeleteAnswer,
  withCreateOption,
  withCreateExclusive,
  withUpdateOption,
  withDeleteOption,
  withCreateOther,
  withDeleteOther
);

export const QUESTION_PAGE_QUERY = gql`
  query GetQuestionPage($id: ID!) {
    questionPage(id: $id) {
      ...QuestionPage
    }
  }

  ${QuestionPageEditor.fragments.QuestionPage}
`;

export default withQuestionPageEditing(props => (
  <Query
    query={QUESTION_PAGE_QUERY}
    fetchPolicy="cache-and-network"
    variables={{ id: props.match.params.pageId }}
  >
    {innerProps => {
      return (
        <UnwrappedQuestionPageRoute
          {...innerProps}
          {...props}
          questionPage={{
            ...get(innerProps.data, "questionPage"),
            ...props.questionPage
          }}
        />
      );
    }}
  </Query>
));
