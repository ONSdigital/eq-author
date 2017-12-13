import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { partial } from "lodash";
import DeleteQuestionnaireButton from "./DeleteQuestionnaireButton";
import QuestionnaireLink from "./QuestionnaireLink";
import FormattedDate from "./FormattedDate";

const Table = styled.table`
  width: 100%;
  font-size: 0.8em;
  border-collapse: collapse;
  text-align: left;
`;

const TH = styled.th`
  padding: 1.5em 1em;
  color: #8e8e8e;
`;

const TR = styled.tr`
  border-top: 1px solid #e2e2e2;
  opacity: 1;
`;

const TD = styled.td`
  line-height: 2;
`;

const Collapsible = styled.div`
  height: 3.75em;
  padding: 1em;
`;

const halfTimeout = props => props.timeout / 2;
const RowTransition = styled(CSSTransition).attrs({
  classNames: "row"
})`
  transition: opacity ${halfTimeout}ms ease-out,
    border-color ${props => props.timeout / 10}ms ease-in ${props =>
  props.timeout / 10 * 9}ms;

  &.row-exit {
    opacity: 0.01;
    border-color: white;
  }

  /* stylelint-disable */
  &.row-exit ${Collapsible} {
    height: 0;
    padding: 0;
    transition: height ${halfTimeout}ms ease-in ${halfTimeout}ms,
    padding ${halfTimeout}ms ease-in ${halfTimeout}ms;
  }
  /* stylelint-enable */
`;

RowTransition.defaultProps = {
  timeout: 200
};

const TBody = props => <tbody {...props} />;

const QuestionnairesTable = ({
  questionnaires,
  onDeleteQuestionnaire: handleDelete
}) => {
  if (!questionnaires || questionnaires.length === 0) {
    return <p>You have no questionnaires</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <TH>Questionnaire name</TH>
          <TH>Date</TH>
          <TH>Created by</TH>
          <TH />
        </tr>
      </thead>
      <TransitionGroup enter={false} component={TBody}>
        {questionnaires.map(questionnaire => (
          <RowTransition key={questionnaire.id}>
            <TR>
              <TD>
                <Collapsible>
                  <QuestionnaireLink
                    questionnaire={questionnaire}
                    title={questionnaire.title}
                    aria-label={questionnaire.title}
                  >
                    {questionnaire.title}
                  </QuestionnaireLink>
                </Collapsible>
              </TD>
              <TD>
                <Collapsible>
                  <FormattedDate date={questionnaire.createdAt} />
                </Collapsible>
              </TD>
              <TD>
                <Collapsible>{questionnaire.createdBy.name}</Collapsible>
              </TD>
              <TD>
                <Collapsible>
                  <DeleteQuestionnaireButton
                    onClick={partial(handleDelete, questionnaire.id)}
                  />
                </Collapsible>
              </TD>
            </TR>
          </RowTransition>
        ))}
      </TransitionGroup>
    </Table>
  );
};

QuestionnairesTable.propTypes = {
  questionnaires: CustomPropTypes.questionnaireList,
  onDeleteQuestionnaire: PropTypes.func.isRequired
};

export default QuestionnairesTable;
