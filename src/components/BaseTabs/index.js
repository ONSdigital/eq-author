import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TabList = styled.ul`
  list-style: none;
  padding: 0;
`;

const renderButton = ({ onChange, activeId, buttonRender }, item) => {
  const { id } = item;
  return buttonRender(
    {
      "aria-selected": id === activeId,
      "aria-controls": id,
      onClick: e => onChange(id)
    },
    item
  );
};

const BaseTabs = props => {
  const { activeId, tabs } = props;
  const { render } = tabs.find(({ id }) => id === activeId);
  return (
    <div>
      <TabList>
        {tabs.map(item => (
          <li key={item.id}>{renderButton(props, item)}</li>
        ))}
      </TabList>
      <div aria-labelledby={activeId}>{render()}</div>
    </div>
  );
};

const StringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

BaseTabs.propTypes = {
  buttonRender: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  activeId: StringOrNumber.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: StringOrNumber.isRequired,
      title: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired
    })
  )
};

export default BaseTabs;
