import React from "react";
import PropTypes from "prop-types";

const renderButton = ({ onChange, activeId, buttonRender }, item) => {
  const { id } = item;
  const isSelected = id === activeId;
  return buttonRender(
    {
      "aria-selected": isSelected,
      "aria-controls": id,
      onClick: () => {
        if (isSelected) {
          return;
        }
        onChange(id);
      },
      key: id
    },
    item
  );
};

const BaseTabs = ({ TabList, buttonRender, onChange, activeId, tabs }) => {
  const { render } = tabs.find(({ id }) => id === activeId);
  return (
    <div>
      <TabList>
        {tabs.map(item =>
          renderButton({ onChange, activeId, buttonRender }, item)
        )}
      </TabList>
      <div aria-labelledby={activeId}>{render()}</div>
    </div>
  );
};

const StringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);
const Component = PropTypes.oneOfType([PropTypes.node, PropTypes.func]);

BaseTabs.propTypes = {
  TabList: Component,
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
BaseTabs.defaultProps = {
  TabList: "ul"
};

export default BaseTabs;
