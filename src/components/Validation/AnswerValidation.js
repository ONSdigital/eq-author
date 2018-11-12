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
import { EarliestDate, LatestDate } from "./Date";

import ValidationContext from "./ValidationContext";

const Container = styled.div`
  padding: 1em 0 0;
`;

const formatDate = dateString =>
  dateString
    .split("-")
    .reverse()
    .join("/");

const DatePreview = ({
  relativePosition,
  customDate,
  offset: { unit, value }
}) => {
  if (!customDate) {
    return "Invalid Rule";
  }

  const formattedDate = formatDate(customDate);
  if (value === 0) {
    return formattedDate;
  }
  return (
    <React.Fragment>
      <div>
        {`${value} ${unit.toLowerCase()} ${relativePosition.toLowerCase()}:`}
      </div>
      <div>{formattedDate}</div>
    </React.Fragment>
  );
};
DatePreview.propTypes = {
  relativePosition: PropTypes.string.isRequired,
  customDate: PropTypes.string,
  offset: PropTypes.shape({
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired
  }).isRequired
};

const validationTypes = [
  {
    id: "minValue",
    title: "Min Value",
    render: () => <MinValueValidation />,
    types: [CURRENCY, NUMBER],
    preview: ({ custom }) => custom
  },
  {
    id: "maxValue",
    title: "Max Value",
    render: () => <MaxValueValidation />,
    types: [CURRENCY, NUMBER],
    preview: ({ custom, previousAnswer }) =>
      custom ? custom : get(previousAnswer, "displayName")
  },
  {
    id: "earliestDate",
    title: "Earliest Date",
    render: () => <EarliestDate />,
    types: [DATE],
    preview: DatePreview
  },
  {
    id: "latestDate",
    title: "Latest Date",
    render: () => <LatestDate />,
    types: [DATE],
    preview: DatePreview
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
          {validValidationTypes.map(validationType => {
            const validation = get(
              answer,
              `validation.${validationType.id}`,
              {}
            );
            const { enabled, previousAnswer } = validation;
            const value = enabled ? validationType.preview(validation) : "";

            return this.renderButton({
              ...validationType,
              value,
              enabled,
              previousAnswer
            });
          })}
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
