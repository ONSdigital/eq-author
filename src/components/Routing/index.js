import React from "react";
import styled from "styled-components";
import { Alert, AlertBody, AlertIcon } from "./Alert";
import RoutingRule from "./RoutingRule";
import AddBtn from "./AddBtn";
import Select from "./Select";
import Panel from "./Panel";
import { findIndex } from "lodash";
import getTextFromHTML from "utils/getTextFromHTML";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import getRoutingOptions from "./routingOptions";

const Title = styled.h1`
  font-size: 1.3em;
  margin: 0;
  padding: 0 0.5em;
`;

const Label = styled.label`
  font-size: 0.9em;
  font-weight: 600;
  margin-right: 0.5em;
  width: 3em;
`;

const RuleGoto = styled.div`
  display: flex;
  align-items: center;
`;

const GotoField = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const GotoLabel = styled(Label)`
  width: 3em;
  font-weight: 500;
`;

const GotoSelect = styled(Select)`
  width: 25em;
  padding-right: 2em;
`;

class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.addPage(props.pageId);
  }

  addPage(pageId) {
    const { addPage, routing } = this.props;
    if (!routing.pages[pageId]) {
      addPage(pageId);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.addPage(nextProps.pageId);
  }

  componentWillUpdate(nextProps, nextState) {
    this.addPage(nextProps.pageId);
  }

  handleAddBtnClick = () => {
    const { pageId, addRule } = this.props;
    addRule(pageId);
  };

  render() {
    const {
      questionnaire,
      section,
      page,
      questionnaireId,
      sectionId,
      pageId,
      routing,
      addRule,
      selectElse,
      ...otherProps
    } = this.props;

    const sectionNumber = findIndex(questionnaire.sections, section) + 1;
    const pageNumber = findIndex(section.pages, page) + 1;
    const pageTitle = getTextFromHTML(page.title) || "Page Title";
    const title = `${sectionNumber}.${pageNumber}. ${pageTitle}`;
    const routeOpts = getRoutingOptions(section, page, questionnaire);

    return (
      <form autoComplete="new-password">
        {routing.rules && routing.rules.length > 0 ? (
          <TransitionGroup>
            {routing.rules &&
              routing.rules.map((rule, index) => (
                <CSSTransition
                  timeout={200}
                  classNames="transition"
                  key={rule.id}
                >
                  <RoutingRule
                    duration={200}
                    questionnaire={questionnaire}
                    section={section}
                    question={page}
                    title={title}
                    rule={rule}
                    firstChild={index === 0}
                    lastChild={index === routing.rules.length - 1}
                    {...otherProps}
                  />
                </CSSTransition>
              ))}
          </TransitionGroup>
        ) : (
          <div>
            <Panel>
              <Title>{title}</Title>
            </Panel>
            <Panel>
              <Alert style={{ padding: "0.5em" }}>
                <AlertIcon />
                <AlertBody>No rules exist for this question.&nbsp;</AlertBody>
                <AddBtn onClick={this.handleAddBtnClick}>Add a rule</AddBtn>
              </Alert>
            </Panel>
          </div>
        )}
        {routing.rules &&
          routing.rules.length > 0 && (
            <div>
              <Panel foo>
                <RuleGoto>
                  <Label>ELSE</Label>
                  <GotoField>
                    <GotoLabel htmlFor={`else`}>Go to</GotoLabel>
                    <GotoSelect
                      defaultValue={""}
                      onChange={function(e) {
                        selectElse(e.value);
                      }}
                      optionGroup={routeOpts}
                      id={`else`}
                    />
                  </GotoField>
                </RuleGoto>
              </Panel>
              <Panel style={{ padding: "0.5em" }}>
                <AddBtn onClick={this.handleAddBtnClick}>
                  Add another rule
                </AddBtn>
              </Panel>
            </div>
          )}
      </form>
    );
  }
}

export default Routing;
