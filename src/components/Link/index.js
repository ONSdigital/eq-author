import React from "react";

const Link = ({ text, data, onClick }) => (
  <a name={data} onClick={onClick}>{text}</a>
);

export default Link;
