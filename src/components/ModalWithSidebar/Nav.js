import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "constants/theme";

export const NavHeader = styled.div`
  height: 4.3em;
  padding: 1em;
  margin-bottom: 1em;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const NavTitle = styled.h2`
  font-weight: bold;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.9em;
  margin: 0;
  text-align: center;
  color: ${colors.grey};
`;

export const NavList = styled.ul`
  list-style: none;
  margin: 0 0 1em;
  padding: 0;
`;

export const NavItem = styled.li`
  margin: 0;
  padding: 0;
`;

export const NavBtn = styled.button`
  --color-text: ${colors.darkGrey};
  color: var(--color-text);
  margin: 0;
  padding: 0.5em 2em;
  appearance: none;
  font-size: 1em;
  width: 100%;
  display: block;
  border: none;
  background: rgba(0, 0, 0, 0);
  text-align: left;
  cursor: pointer;

  &:hover {
    --color-text: ${colors.text};
    background: rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 3px solid ${colors.orange};
    outline-offset: -3px;
  }

  &:active {
    outline: none;
  }

  &[aria-current="true"] {
    background: ${colors.orange};
    pointer-events: none;

    --color-text: ${colors.black};
    &::before {
      filter: invert(80%);
    }
  }
`;

export const Nav = ({ items, onClick, title }) => {
  return (
    <React.Fragment>
      <NavHeader>
        <NavTitle>{title}</NavTitle>
      </NavHeader>
      <NavList>
        {items.map(item => {
          const handleClick = onClick(item.id);
          return (
            <NavItem key={item.id}>
              <NavBtn onClick={handleClick} aria-current={item.active}>
                {item.title}
              </NavBtn>
            </NavItem>
          );
        })}
      </NavList>
    </React.Fragment>
  );
};

Nav.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired
    })
  ),
  title: PropTypes.string.isRequired
};
