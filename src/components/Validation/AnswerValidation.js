import React from "react";
import { kebabCase, get } from "lodash";
import styled from "styled-components";
import CustomPropTypes from "custom-prop-types";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { gotoTab } from "redux/tabs/actions";
import { CURRENCY, DATE, NUMBER } from "constants/answer-types";
import { colors } from "constants/theme";

import SidebarButton, { Title, Detail } from "components/SidebarButton";
import ModalWithNav from "components/ModalWithNav";
import MinValueValidation from "./MinValue";
import MaxValueValidation from "./MaxValue";
import EarliestDateValidation from "./EarliestDate";

import ValidationContext from "./ValidationContext";

const Container = styled.div`
  margin-top: 1em;
  border-top: 1px solid ${colors.lightGrey};
  padding: 1em 0;
`;

const validationTypes = [
  {
    id: "minValue",
    title: "Min Value",
    render: () => <MinValueValidation />,
    types: [CURRENCY, NUMBER]
  },
  {
    id: "maxValue",
    title: "Max Value",
    render: () => <MaxValueValidation />,
    types: [CURRENCY, NUMBER]
  },
  {
    id: "earliestDate",
    title: "Earliest Date",
    render: () => <EarliestDateValidation />,
    types: [DATE],
    custom: "customDate"
  }
];

const getValidationsForType = type =>
  validationTypes.filter(({ types }) => types.includes(type));

const validations = [NUMBER, CURRENCY, DATE].reduce(
  (hash, type) => ({
    ...hash,
    [type]: getValidationsForType(type)
  }),
  {}
);

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

    const validValidationTypes = validations[answer.type] || [];

    if (validValidationTypes.length === 0) {
      return null;
    }

    return (
      <Container>
        <ValidationContext.Provider value={{ answer }}>
          {validValidationTypes.map(validationType =>
            this.renderButton({
              ...validationType,
              value: get(
                answer,
                `validation.${validationType.id}.${validationType.custom ||
                  "custom"}`
              ),
              enabled: get(answer, `validation.${validationType.id}.enabled`)
            })
          )}
          <ModalWithNav
            id={this.modalId}
            onClose={this.handleModalClose}
            navItems={validValidationTypes}
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
