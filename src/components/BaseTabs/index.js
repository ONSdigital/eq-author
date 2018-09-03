import React from "react";
import PropTypes from "prop-types";

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

const BaseTabs = ({
  TabList,
  TabItem,
  buttonRender,
  onChange,
  activeId,
  tabs
}) => {
  const { render } = tabs.find(({ id }) => id === activeId);
  return (
    <div>
      <TabList>
        {tabs.map(item => (
          <TabItem key={item.id}>
            {renderButton({ onChange, activeId, buttonRender }, item)}
          </TabItem>
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
const Component = PropTypes.oneOfType([PropTypes.node, PropTypes.func]);

BaseTabs.propTypes = {
  TabList: Component,
  TabItem: Component,
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
  TabList: "ul",
  TabItem: "li"
};

export default BaseTabs;
