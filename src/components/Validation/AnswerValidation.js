import React from "react";
import { kebabCase, includes, find, get } from "lodash";
import styled from "styled-components";
import CustomPropTypes from "custom-prop-types";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { gotoTab } from "redux/tabs/actions";
import { CURRENCY, NUMBER } from "constants/answer-types";
import { colors } from "constants/theme";

import SidebarButton, { Title, Detail } from "components/SidebarButton";
import ModalWithNav from "components/ModalWithNav";
import MinValueValidation from "./MinValue";
import MaxValueValidation from "./MaxValue";

import ValidationContext from "./ValidationContext";

const answerTypes = [CURRENCY, NUMBER];

const Container = styled.div`
  margin-top: 1em;
  border-top: 1px solid ${colors.lightGrey};
  padding: 1em 0;
`;

const validationTypes = [
  {
    id: "min-value",
    title: "Min Value",
    component: <MinValueValidation />
  },
  {
    id: "max-value",
    title: "Max Value",
    component: <MaxValueValidation />
  }
];

export class UnconnectedAnswerValidation extends React.Component {
  state = {
    modalIsOpen: false,
    answerId: null
  };

  constructor(props) {
    super(props);
    this.modalId = `modal-validation-${props.answer.id}`;
  }

  handleModalClose = () => this.setState({ modalIsOpen: false });

  renderButton = ({ id, title, value, enabled }) => (
    <SidebarButton
      key={id}
      data-test={`sidebar-button-${kebabCase(title)}`}
      onClick={() => {
        this.props.gotoTab(this.modalId, id);
        this.setState({ modalIsOpen: true });
      }}
    >
      <Title>{title}</Title>
      {enabled && value && <Detail>{value}</Detail>}
    </SidebarButton>
  );

  render() {
    const { answer } = this.props;

    if (!includes(answerTypes, answer.type)) {
      return null;
    }

    return (
      <Container>
        <ValidationContext.Provider value={{ answer }}>
          {this.renderButton({
            ...find(validationTypes, { id: "min-value" }),
            value: get(answer, "validation.minValue.custom"),
            enabled: get(answer, "validation.minValue.enabled")
          })}
          {this.renderButton({
            ...find(validationTypes, { id: "max-value" }),
            value: get(answer, "validation.maxValue.custom"),
            enabled: get(answer, "validation.maxValue.enabled")
          })}
          <ModalWithNav
            id={this.modalId}
            onClose={this.handleModalClose}
            navItems={validationTypes}
            title={`${answer.type} validation`}
            isOpen={this.state.modalIsOpen}
          />
        </ValidationContext.Provider>
      </Container>
    );
  }
}

UnconnectedAnswerValidation.propTypes = {
  answer: CustomPropTypes.answer,
  gotoTab: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tabsState: state.tabs
});

export default connect(
  mapStateToProps,
  { gotoTab }
)(UnconnectedAnswerValidation);
