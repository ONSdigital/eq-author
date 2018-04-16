import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "components/Button";
import PlainModal from "./PlainModal";
import ButtonGroup from "components/ButtonGroup";
import ScrollPane from "components/ScrollPane";

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  min-width: 0;
`;

const Title = styled.legend`
  margin: 0;
  padding: 0.75rem;
  color: #858585;
  font-size: 1.25em;
  font-weight: bold;
  display: block;
`;

const BodyWrapper = styled.div`
  max-height: 18em;
`;

const Body = props => (
  <ScrollPane>
    <BodyWrapper {...props} />
  </ScrollPane>
);

const StyledButtonGroup = styled(ButtonGroup).attrs({
  horizontal: true
})`
  padding: 1em;
  justify-content: space-around;
  border-top: 1px solid #aeaeae;
`;

const StyledButton = styled(Button)`
  flex: 1;
`;

const ItemSelectModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  secondaryText,
  primaryText,
  children,
  ...otherProps
}) => (
  <PlainModal isOpen={isOpen} onClose={onClose} {...otherProps}>
    <form onSubmit={onConfirm}>
      <Fieldset>
        <Title>{title}</Title>
        <Body>{children}</Body>
      </Fieldset>
      <StyledButtonGroup>
        <StyledButton onClick={onClose} secondary type="button">
          {secondaryText}
        </StyledButton>
        <StyledButton type="submit" primary>
          {primaryText}
        </StyledButton>
      </StyledButtonGroup>
    </form>
  </PlainModal>
);

ItemSelectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

ItemSelectModal.defaultProps = {
  secondaryText: "Cancel",
  primaryText: "Select"
};

export default ItemSelectModal;
