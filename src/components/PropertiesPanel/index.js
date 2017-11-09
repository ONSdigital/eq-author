import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";
import { Accordion, AccordionPanel } from "components/Accordion";
import { colors } from "constants/theme";
import PageProperties from "../PageProperties/index";
import ScrollPane from "components/ScrollPane";
import { noop } from "lodash";
import getIdForObject from "utils/getIdForObject";
import AnswerPropertiesContainer from "containers/AnswerPropertiesContainer";
import QuestionnairePropertiesContainer from "containers/QuestionnairePropertiesContainer";

const PropertiesPane = styled.div`
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border-left: 2px solid #eee;
  font-size: 1em;
`;

const PropertiesPanelTitle = styled.h2`
  font-size: 0.6em;
  text-transform: uppercase;
  font-weight: 900;
  margin: 0;
  line-height: 1.5em;
  position: relative;
  padding: 1.7em 1.4em 1.2em;
  border-bottom: 1px solid ${colors.borders};
`;

const PropertiesPaneBody = styled.div`
  background: ${colors.white};
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;

class PropertiesPanel extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    page: CustomPropTypes.page,
    orderMin: PropTypes.number.isRequired,
    orderMax: PropTypes.number.isRequired
  };

  handleChange = noop;

  handleBlur = noop;

  handleSubmit = noop;

  render() {
    return (
      <PropertiesPane>
        <PropertiesPanelTitle>Properties</PropertiesPanelTitle>
        <PropertiesPaneBody>
          <ScrollPane>
            <Accordion>
              <AccordionPanel
                id={getIdForObject(this.props.questionnaire)}
                title="Questionnaire"
              >
                <QuestionnairePropertiesContainer
                  questionnaire={this.props.questionnaire}
                />
              </AccordionPanel>
              <AccordionPanel id={getIdForObject(this.props.page)} title="Page">
                <PageProperties
                  page={this.props.page}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  onSubmit={this.handleSubmit}
                  orderMin={this.props.orderMin}
                  orderMax={this.props.orderMax}
                />
              </AccordionPanel>
              {this.props.page.answers.map((answer, index) => (
                <AccordionPanel
                  key={answer.id}
                  id={getIdForObject(answer)}
                  title={`Answer ${index + 1}`}
                >
                  <AnswerPropertiesContainer
                    answer={answer}
                    onSubmit={this.handleSubmit}
                  />
                </AccordionPanel>
              ))}
            </Accordion>
          </ScrollPane>
        </PropertiesPaneBody>
      </PropertiesPane>
    );
  }
}

export default PropertiesPanel;
