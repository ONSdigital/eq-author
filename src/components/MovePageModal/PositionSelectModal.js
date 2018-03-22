import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";
import Button from "components/Button";
import ItemSelect, { Option } from "./ItemSelect";
import PlainModal, { Title, Body, Fieldset } from "./PlainModal";
import ButtonGroup from "components/ButtonGroup";
import getTextFromHTML from "utils/getTextFromHTML";

const StyledButtonGroup = styled(ButtonGroup).attrs({
  horizontal: true,
  align: "right"
})`
  padding: 1em;
  justify-content: space-around;
  border-top: 1px solid #aeaeae;
`;

const StyledButton = styled(Button)`
  flex: 1;
`;

const PositionSelectModal = ({
  isOpen,
  onClose,
  onChange,
  selectedPosition,
  pages,
  onConfirm
}) => (
  <PlainModal isOpen={isOpen} onClose={onClose}>
    <form onSubmit={onConfirm}>
      <Fieldset>
        <Title>Position</Title>
        <Body>
          <ItemSelect
            value={String(selectedPosition)}
            onChange={onChange}
            name="position"
          >
            {pages.map((page, i) => (
              <Option key={i} value={String(i)}>
                {getTextFromHTML(page.title)}
              </Option>
            ))}
          </ItemSelect>
        </Body>
      </Fieldset>
      <StyledButtonGroup>
        <StyledButton onClick={onClose} secondary type="button">
          Cancel
        </StyledButton>
        <StyledButton type="submit" primary>
          Move
        </StyledButton>
      </StyledButtonGroup>
    </form>
  </PlainModal>
);

PositionSelectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedPosition: PropTypes.number.isRequired,
  pages: PropTypes.arrayOf(CustomPropTypes.page).isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default PositionSelectModal;
