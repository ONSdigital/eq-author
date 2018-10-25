import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup } from "react-transition-group";
import { isEmpty } from "lodash";
import gql from "graphql-tag";

import Row from "./Row";

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
`;

TH.propTypes = {
  colWidth: PropTypes.string.isRequired
};

const TBody = props => <tbody {...props} />;

const QuestionnairesTable = ({
  questionnaires,
  onDeleteQuestionnaire,
  onDuplicateQuestionnaire
}) => {
  if (isEmpty(questionnaires)) {
    return <p>You have no questionnaires</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <TH colWidth="50%">Questionnaire name</TH>
          <TH colWidth="15%">Date</TH>
          <TH colWidth="25%">Created by</TH>
          <TH colWidth="10%" />
        </tr>
      </thead>
      <TransitionGroup enter={false} component={TBody}>
        {questionnaires.map(questionnaire => (
          <Row
            key={questionnaire.id}
            questionnaire={questionnaire}
            onDeleteQuestionnaire={onDeleteQuestionnaire}
            onDuplicateQuestionnaire={onDuplicateQuestionnaire}
          />
        ))}
      </TransitionGroup>
    </Table>
  );
};

QuestionnairesTable.propTypes = {
  questionnaires: CustomPropTypes.questionnaireList,
  onDeleteQuestionnaire: PropTypes.func.isRequired,
  onDuplicateQuestionnaire: PropTypes.func.isRequired
};

QuestionnairesTable.fragments = {
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

export default QuestionnairesTable;
