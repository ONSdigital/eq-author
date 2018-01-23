import React from "react";

const calcWidth = defaultValue => {
  const text = document.createElement("span");
  text.innerHTML = defaultValue;
  root.appendChild(text);
  const width = text.getBoundingClientRect().width;
  root.removeChild(text);
  return width;
};

const FluidSelect = ({ children, defaultValue, ...otherProps }) => (
  <select
    style={{ width: `calc(${calcWidth(defaultValue)}px + 1.7em)` }}
    defaultValue={defaultValue}
    {...otherProps}
  >
    {children}
  </select>
);

export default FluidSelect;
