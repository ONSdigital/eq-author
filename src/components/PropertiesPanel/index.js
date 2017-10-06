import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";
import { Accordion, AccordionPanel } from "components/Accordion";
import { colors } from "constants/theme";
import PageProperties from "../PageProperties/index";
import AnswerProperties from "../AnswerProperties/index";
import ScrollPane from "components/ScrollPane";
import { noop } from "lodash";
import getIdForObject from "utils/getIdForObject";

const StyledDiv = styled.div`
  background: ${colors.white};
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border-left: 2px solid #eee;
`;

class PropertiesPanel extends React.Component {
  static propTypes = {
    page: CustomPropTypes.page,
    orderMin: PropTypes.number.isRequired,
    orderMax: PropTypes.number.isRequired
  };

  handleChange = noop;

  handleBlur = noop;

  handleSubmit = noop;

  render() {
    return (
      <StyledDiv>
        <ScrollPane>
          <Accordion>
            <AccordionPanel
              id={getIdForObject(this.props.page)}
              title="Page properties"
            >
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
                title={`Answer ${index + 1} properties`}
              >
                <AnswerProperties
                  answer={answer}
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                />
              </AccordionPanel>
            ))}
          </Accordion>
        </ScrollPane>
      </StyledDiv>
    );
  }
}

export default PropertiesPanel;
