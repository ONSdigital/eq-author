import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getLink } from "utils/UrlUtils";
import { colors } from "../../constants/theme";
import CommentsButton from "./CommentsButton";
import DeleteQuestionnaireButton from "./DeleteQuestionnaireButton";

const duration = 200;

export const QuestionnaireLink = styled.a`
  text-decoration: none;
  color: ${colors.blue};
  width: 100%;
  max-width: 33em;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;

  &:hover {
    text-decoration: underline;
  }
`;

const Table = styled.table`
  width: 100%;
  font-size: 0.8em;
  border-collapse: collapse;
`;

const ColumnPropTypes = {
  centerAligned: PropTypes.bool
};

const TH = styled.th`
  padding: 1.5em 1em;
  color: #8e8e8e;
  text-align: ${props => (props.centerAligned ? "center" : "left")};
`;

TH.propTypes = ColumnPropTypes;

const TR = styled.tr`
  border-top: 1px solid #e2e2e2;
  opacity: 1;
  transition: opacity ${duration / 2}ms ease-out,
    border-color ${duration / 10}ms ease-in ${duration / 10 * 9}ms;

  &.row-exit {
    opacity: 0.01;
    border-color: white;
  }
`;

const TD = styled.td`
  line-height: 2;
  text-align: ${props => (props.centerAligned ? "center" : "left")};
`;

TD.propTypes = ColumnPropTypes;

const Collapsible = styled.div`
  height: 3.75em;
  padding: 1em;

  .row-exit & {
    height: 0;
    padding: 0;
    transition: height ${duration / 2}ms ease-in ${duration / 2}ms,
      padding ${duration / 2}ms ease-in ${duration / 2}ms;
  }
`;

const TBody = ({ children }) => <tbody>{children}</tbody>;

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
          <TH centerAligned>Comments</TH>
          <TH>Created by</TH>
          <TH />
        </tr>
      </thead>

      <TransitionGroup enter={false} component={TBody}>
        {questionnaires.map(questionnaire => {
          const createdAt = new Date(
            questionnaire.createdAt
          ).toLocaleDateString("en-gb");
          const url = `#${getLink(
            questionnaire.id,
            questionnaire.sections[0].id,
            questionnaire.sections[0].pages[0].id
          )}`;

          return (
            <CSSTransition
              key={questionnaire.id}
              timeout={duration}
              classNames="row"
            >
              <TR>
                <TD>
                  <Collapsible first>
                    <QuestionnaireLink
                      href={url}
                      title={questionnaire.title}
                      aria-label={questionnaire.title}
                    >
                      {questionnaire.title}
                    </QuestionnaireLink>
                  </Collapsible>
                </TD>
                <TD>
                  <Collapsible>{createdAt}</Collapsible>
                </TD>
                <TD>
                  <Collapsible>{questionnaire.theme}</Collapsible>
                </TD>
                <TD>
                  <Collapsible>{questionnaire.status}</Collapsible>
                </TD>
                <TD centerAligned>
                  <Collapsible>
                    {questionnaire.comments.count > 0 && (
                      <CommentsButton
                        hasUnread={questionnaire.comments.unread}
                      />
                    )}
                  </Collapsible>
                </TD>
                <TD>
                  <Collapsible>{questionnaire.createdBy.name}</Collapsible>
                </TD>
                <TD>
                  <Collapsible last>
                    <DeleteQuestionnaireButton
                      onClick={function() {
                        handleDelete(questionnaire.id);
                      }}
                    />
                  </Collapsible>
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
