import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { partial, isEmpty } from "lodash";
import IconButtonDelete from "components/IconButtonDelete";
import QuestionnaireLink from "./QuestionnaireLink";
import FormattedDate from "./FormattedDate";
import Truncated from "components/Truncated";

const Table = styled.table`
  width: 100%;
  font-size: 0.9em;
  border-collapse: collapse;
  table-layout: fixed;
  text-align: left;
`;

const TruncatedQuestionnaireLink = Truncated.withComponent(QuestionnaireLink);
TruncatedQuestionnaireLink.displayName = "TruncatedQuestionnaireLink";

const TH = styled.th`
  padding: 1.5em 1em;
  color: #8e8e8e;
  width: ${props => props.colWidth};
`;

TH.propTypes = {
  colWidth: PropTypes.string.isRequired
};

const TR = styled.tr`
  border-top: 1px solid #e2e2e2;
  opacity: 1;
`;

const TD = styled.td`
  line-height: 2;
  text-align: ${props => props.textAlign};
`;

TD.propTypes = {
  textAlign: PropTypes.oneOf(["left", "center", "right"])
};

TD.defaultProps = {
  textAlign: "left"
};

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

  &.row-exit ${Collapsible} {
    height: 0;
    padding: 0;
    transition: height ${halfTimeout}ms ease-in ${halfTimeout}ms,
    padding ${halfTimeout}ms ease-in ${halfTimeout}ms;
  }
`;

RowTransition.defaultProps = {
  timeout: 200
};

const TBody = props => <tbody {...props} />;

const QuestionnairesTable = ({
  questionnaires,
  onDeleteQuestionnaire: handleDelete
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
          <RowTransition key={questionnaire.id}>
            <TR>
              <TD>
                <Collapsible>
                  <TruncatedQuestionnaireLink
                    questionnaire={questionnaire}
                    title={questionnaire.title}
                  >
                    {questionnaire.title}
                  </TruncatedQuestionnaireLink>
                </Collapsible>
              </TD>
              <TD>
                <Collapsible>
                  <FormattedDate date={questionnaire.createdAt} />
                </Collapsible>
              </TD>
              <TD>
                <Collapsible>
                  <Truncated>
                    {questionnaire.createdBy.name || "Unknown"}
                  </Truncated>
                </Collapsible>
              </TD>
              <TD textAlign="center">
                <Collapsible>
                  <IconButtonDelete
                    hideText
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
