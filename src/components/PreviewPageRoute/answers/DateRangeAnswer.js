import React from "react";
import DateAnswer from "./DateAnswer";

export default ({ answer }) => {
  const { childAnswers, properties } = answer;
  const [from, to] = childAnswers;

  return (
    <div>
      <DateAnswer answer={{ ...from, properties }} />
      <DateAnswer answer={{ ...to, properties }} />
    </div>
  );
};
