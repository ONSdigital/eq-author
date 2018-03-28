import React from "react";
import styled from "styled-components";
import { colors } from "constants/theme";
import PropTypes from "prop-types";
import VisuallyHidden from "components/VisuallyHidden";
import iconMoveIndicator from "./icon-move-indicator.svg";
import { uniqueId } from "lodash";
import withChangeHandler from "../Forms/withChangeHandler";

const Input = VisuallyHidden.withComponent("input");
Input.defaultProps = {
  type: "radio"
};

const Truncated = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  padding: 0.5em 0.5em 0.5em 2.25em;
  position: relative;

  &:hover {
    background-color: ${colors.lighterGrey};
  }

  ${/* sc-sel */ Input}:focus + & {
    outline: 2px solid ${colors.text};
    outline-offset: -2px;
  }

  ${/* sc-sel */ Input}:checked + & {
    background-color: ${colors.blue};
    color: ${colors.white};
  }

  &:hover::before {
    background-color: ${colors.text};
  }

  &:hover::before,
  ${/* sc-sel */ Input}:checked + &::before {
    content: "";
    position: absolute;
    left: 1rem;
    width: 1em;
    height: 1em;
    mask-image: url('${iconMoveIndicator}');
    mask-repeat: no-repeat;
    mask-position: center center;
  }

  ${/* sc-sel */ Input}:checked + &::before {
    background-color: white;
  }
`;

export const Option = ({
  name,
  selected,
  value,
  onChange,
  id = uniqueId("ItemList_Option"),
  children,
  ...otherProps
}) => (
  <div {...otherProps}>
    <Input
      value={value}
      id={id}
      onChange={onChange}
      checked={selected}
      name={name}
    />

    <Label selected={selected} htmlFor={id}>
      <Truncated>{children}</Truncated>
    </Label>
  </div>
);

Option.propTypes = {
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  children: PropTypes.node.isRequired
};

const ItemSelect = ({ children, value, name, onChange, ...otherProps }) => (
  <div {...otherProps}>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        onChange,
        name,
        selected: child.props.value === value
      })
    )}
  </div>
);

ItemSelect.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withChangeHandler(ItemSelect);
