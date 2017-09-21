import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { colors } from "../../constants/theme";
import CommentsButton from "./CommentsButton";
import DeleteQuestionnaireButton from "./DeleteQuestionnaireButton";

const duration = 300;

const Link = styled.a`
  text-decoration: none;
  color: ${colors.blue};
  opacity: 1;
  transition: opacity .2s ease-in-out;
  width: 260px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    opacity: .7;
  }
`;

const Table = styled.table`
  width: 100%;
  font-size: .8em;
  border-collapse: collapse;
`;

const TH = styled.th`
  padding: 1.5em 1em;
  color: #8e8e8e;
  text-align: center;
  &:nth-child(1) {
    text-align: left;
  }
`;

const TR = styled.tr`
  border-top: 1px solid #e2e2e2;
  opacity: 1;
  height: 2em;

  &.row-exit {
    opacity: 0.01;
    height: 0em;
    transition: opacity ${duration}ms ease-out,
      height ${duration / 2}ms ease-out ${duration / 2}ms;
  }
`;

const TD = styled.td`
  padding: 1.2em;
  text-align: center;

  &:nth-child(1),
  &:nth-child(6) {
    text-align: left;
  }
`;

const TBody = ({ children }) =>
  <tbody>
    {children}
  </tbody>;

TBody.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

const QuestionnairesTable = ({ questionnaires, onDeleteQuestionnaire }) => {
  const handleDelete = questionnaireId => {
    onDeleteQuestionnaire(questionnaireId);
  };

  if (!questionnaires || questionnaires.length === 0) {
    return <p>You have no questionnaires</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <TH>Questionnaire name</TH>
          <TH>Date</TH>
          <TH>Theme</TH>
          <TH>Status</TH>
          <TH>Comments</TH>
          <TH />
        </tr>
      </thead>

      <TransitionGroup enter={false} component={TBody}>
        {questionnaires.map(questionnaire => {
          const createdAt = new Date(
            questionnaire.createdAt
          ).toLocaleDateString("en-gb");
          const url = `#/questionnaire/${questionnaire.id}/design/${questionnaire
            .sections[0].id}/${questionnaire.sections[0].pages[0].id}/`;

          return (
            <CSSTransition
              key={questionnaire.id}
              timeout={duration}
              classNames="row"
            >
              <TR>
                <TD>
                  <Link
                    href={url}
                    title={questionnaire.title}
                    aria-label={questionnaire.title}
                  >
                    {questionnaire.title}
                  </Link>
                </TD>
                <TD>
                  {createdAt}
                </TD>
                <TD>
                  {questionnaire.theme}
                </TD>
                <TD>
                  {questionnaire.status}
                </TD>
                <TD>
                  {questionnaire.comments.count > 0 &&
                    <CommentsButton
                      hasUnread={questionnaire.comments.unread}
                    />}
                </TD>
                <TD>
                  <DeleteQuestionnaireButton
                    onClick={function() {
                      handleDelete(questionnaire.id);
                    }}
                  />
                </TD>
              </TR>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </Table>
  );
};

QuestionnairesTable.propTypes = {
  questionnaires: CustomPropTypes.questionnaireList,
  onDeleteQuestionnaire: PropTypes.func.isRequired
};

export default QuestionnairesTable;
