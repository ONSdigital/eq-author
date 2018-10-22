import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { flowRight } from "lodash";
import { Titled } from "react-titled";

import CustomPropTypes from "custom-prop-types";

import BaseLayout from "components/BaseLayout";
import { CenteredPanel } from "components/Panel";
import ButtonGroup from "components/ButtonGroup";
import Button from "components/Button";
import QuestionnairesTable from "./QuestionnairesTable";
import MainCanvas from "components/MainCanvas";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";
import Loading from "components/Loading";
import Error from "components/Error";

import withQuestionnaireList from "containers/enhancers/withQuestionnaireList";
import withDeleteQuestionnaire from "containers/enhancers/withDeleteQuestionnaire";
import withCreateQuestionnaire from "containers/enhancers/withCreateQuestionnaire";
import { raiseToast } from "redux/toast/actions";
import { connect } from "react-redux";
import { getUser } from "redux/auth/reducer";
import { ScrollContext } from "../ScrollPane/withScroll";

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 0 0 1em;
`;

const StyledCenteredPanel = styled(CenteredPanel)`
  padding: 0;
`;

const QUESTIONNAIRES_QUERY = gql`
  query GetQuestionnaireList {
    questionnaires {
      ...QuestionnaireDetails
    }
  }
  ${QuestionnairesTable.fragments.QuestionnaireDetails}
`;

export class UnconnectedQuestionnairesPage extends React.Component {
  state = {
    isModalOpen: false,
    scroll: 0
  };

  handleModalOpen = () => this.setState({ isModalOpen: true });
  handleModalClose = () => this.setState({ isModalOpen: false });

  renderResults = response => {
    const { loading, error, data } = response;

    if (loading) {
      return <Loading height="24.25rem">Questionnaires loading…</Loading>;
    }

    if (error) {
      return <Error>Oops! Questionnaires could not be found</Error>;
    }

    return (
      <QuestionnairesTable
        questionnaires={data.questionnaires}
        onDeleteQuestionnaire={this.props.onDeleteQuestionnaire}
      />
    );
  };

  renderTitle = title => `Your Questionnaires - ${title}`;

  handleScroll = e => {
    console.log(e.target.scrollTop);

    this.setState({
      scroll: e.target.scrollTop
    });
  };

  render() {
    const { onCreateQuestionnaire } = this.props;

    return (
      <ScrollContext.Provider value={this.state.scroll}>
        <Titled title={this.renderTitle}>
          <BaseLayout
            title={"Your Questionnaires"}
            onScroll={this.handleScroll}
          >
            <MainCanvas>
              <StyledButtonGroup horizontal>
                <Button
                  onClick={this.handleModalOpen}
                  primary
                  data-test="create-questionnaire"
                >
                  Create
                </Button>
                <QuestionnaireSettingsModal
                  isOpen={this.state.isModalOpen}
                  onClose={this.handleModalClose}
                  onSubmit={onCreateQuestionnaire}
                  confirmText="Create"
                />
              </StyledButtonGroup>
              <StyledCenteredPanel>
                <Query query={QUESTIONNAIRES_QUERY}>{this.renderResults}</Query>
              </StyledCenteredPanel>
            </MainCanvas>
          </BaseLayout>
        </Titled>
      </ScrollContext.Provider>
    );
  }
}

UnconnectedQuestionnairesPage.propTypes = {
  loading: PropTypes.bool,
  questionnaires: CustomPropTypes.questionnaireList,
  onCreateQuestionnaire: PropTypes.func.isRequired,
  onDeleteQuestionnaire: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: getUser(state)
});

export default flowRight(
  connect(
    mapStateToProps,

    { raiseToast }
  ),
  withQuestionnaireList,
  withCreateQuestionnaire,
  withDeleteQuestionnaire // relies on raiseToast to display undo
)(UnconnectedQuestionnairesPage);
