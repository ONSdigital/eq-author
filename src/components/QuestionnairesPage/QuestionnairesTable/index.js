import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup } from "react-transition-group";
import { isEmpty } from "lodash";
import gql from "graphql-tag";
import { connect } from "react-redux";

import { getUser } from "redux/auth/reducer";
import scrollIntoView from "utils/scrollIntoView";

import Row from "./Row";
import FadeTransition from "../../FadeTransition";

const Table = styled.table`
  width: 100%;
  font-size: 0.9em;
  border-collapse: collapse;
  table-layout: fixed;
  text-align: left;
`;

const TH = styled.th`
  padding: 1.5em 1em;
  color: #8e8e8e;
  width: ${props => props.colWidth};
  border-bottom: 1px solid #e2e2e2;
`;

TH.propTypes = {
  colWidth: PropTypes.string.isRequired
};

const TBody = props => <tbody {...props} />;

export class UnconnectedQuestionnairesTable extends React.Component {
  static propTypes = {
    questionnaires: CustomPropTypes.questionnaireList,
    onDeleteQuestionnaire: PropTypes.func.isRequired,
    onDuplicateQuestionnaire: PropTypes.func.isRequired,
    user: CustomPropTypes.user
  };

  static fragments = {
    QuestionnaireDetails: gql`
      fragment QuestionnaireDetails on Questionnaire {
        id
        title
        createdAt
        createdBy {
          name
        }
      }
    `
  };

  headRef = React.createRef();

  handleDuplicateQuestionnaire = questionnaire => {
    scrollIntoView(this.headRef.current);
    this.props.onDuplicateQuestionnaire(questionnaire, this.props.user);
  };

  handleEntered(node) {
    node.getElementsByTagName("a")[0].focus();
  }

  render() {
    const { questionnaires, onDeleteQuestionnaire } = this.props;
    if (isEmpty(questionnaires)) {
      return <p>You have no questionnaires</p>;
    }
    return (
      <Table>
        <thead ref={this.headRef}>
          <tr>
            <TH colWidth="50%">Questionnaire name</TH>
            <TH colWidth="15%">Date</TH>
            <TH colWidth="22%">Created by</TH>
            <TH colWidth="14%" />
          </tr>
        </thead>
        <TransitionGroup component={TBody}>
          {questionnaires.map(questionnaire => {
            return (
              <FadeTransition
                timeout={400}
                key={questionnaire.id.replace("dupe-", "")}
                onEntered={this.handleEntered}
                enter
              >
                <Row
                  questionnaire={questionnaire}
                  onDeleteQuestionnaire={onDeleteQuestionnaire}
                  onDuplicateQuestionnaire={this.handleDuplicateQuestionnaire}
                />
              </FadeTransition>
            );
          })}
        </TransitionGroup>
      </Table>
    );
  }
}

export const mapStateToProps = state => ({
  user: getUser(state)
});

export default connect(mapStateToProps)(UnconnectedQuestionnairesTable);
