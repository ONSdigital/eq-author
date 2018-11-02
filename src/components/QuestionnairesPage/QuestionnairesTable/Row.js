import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import CustomPropTypes from "custom-prop-types";
import { partial } from "lodash";

import IconButtonDelete from "components/IconButtonDelete";
import DuplicateButton from "components/DuplicateButton";
import Truncated from "components/Truncated";

import { colors } from "constants/theme";

import QuestionnaireLink from "../QuestionnaireLink";
import FormattedDate from "../FormattedDate";

const TruncatedQuestionnaireLink = Truncated.withComponent(QuestionnaireLink);
TruncatedQuestionnaireLink.displayName = "TruncatedQuestionnaireLink";

const TR = styled.tr`
  border-top: 1px solid #e2e2e2;
  opacity: 1;
  color: ${props => (props.disabled ? `${colors.textLight}` : "inherit")};
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
  height: 3.95em;
  padding: 1em;
`;

const IconCollapsible = styled(Collapsible)`
  padding: 1em 0 0;
`;

const halfTimeout = props => props.timeout / 2;
const RowTransition = styled(CSSTransition).attrs({
  classNames: "row"
})`
  &.row-enter ${Collapsible} {
    height: 0;
    padding: 0 1em;
    overflow: hidden;
  }

  &.row-enter ${IconCollapsible} {
    padding: 1em 0 0;
    overflow: hidden;
  }

  &.row-enter-active ${Collapsible} {
    padding: 1em;
    height: 3.95em;
    transition: height ${halfTimeout}ms ease-in,
      padding ${halfTimeout}ms ease-in;
  }

  &.row-enter-active ${IconCollapsible} {
    padding: 1em 0 0;
  }

  &.row-exit {
    opacity: 0.01;
    border-color: white;
  }

  &.row-exit ${Collapsible} {
    height: 0;
    padding: 0;
    overflow: hidden;
    transition: height ${halfTimeout}ms ease-in ${halfTimeout}ms,
      padding ${halfTimeout}ms ease-in ${halfTimeout}ms;
  }
`;

RowTransition.defaultProps = {
  timeout: 200
};

class Row extends React.Component {
  handleDuplicateQuestionnaire = () => {
    this.props.onDuplicateQuestionnaire(this.props.questionnaire);
  };

  isQuestionnaireADuplicate() {
    return this.props.questionnaire.id.startsWith("dupe");
  }

  handleEntered(node) {
    node.focus();
  }

  render() {
    const { questionnaire, onDeleteQuestionnaire, ...rest } = this.props;

    const isOptimisticDupe = this.isQuestionnaireADuplicate();

    return (
      <RowTransition
        {...rest}
        exit={!isOptimisticDupe}
        entry={isOptimisticDupe}
        onEntered={this.handleEntered}
      >
        <TR disabled={isOptimisticDupe} tabIndex={-1}>
          <TD>
            <Collapsible>
              <TruncatedQuestionnaireLink
                data-test="anchor-questionnaire-title"
                questionnaire={questionnaire}
                title={questionnaire.title}
                disabled={isOptimisticDupe}
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
              <Truncated>{questionnaire.createdBy.name || "Unknown"}</Truncated>
            </Collapsible>
          </TD>
          <TD textAlign="center">
            <IconCollapsible>
              <DuplicateButton
                data-test="btn-duplicate-questionnaire"
                onClick={this.handleDuplicateQuestionnaire}
                disabled={isOptimisticDupe}
              />
              <IconButtonDelete
                hideText
                data-test="btn-delete-questionnaire"
                onClick={partial(onDeleteQuestionnaire, questionnaire.id)}
                disabled={isOptimisticDupe}
              />
            </IconCollapsible>
          </TD>
        </TR>
      </RowTransition>
    );
  }
}

Row.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  onDeleteQuestionnaire: PropTypes.func.isRequired,
  onDuplicateQuestionnaire: PropTypes.func.isRequired,
  shouldFocus: PropTypes.bool
};

export default Row;
