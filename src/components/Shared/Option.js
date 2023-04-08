import React from "react";

const Option = ({ op, findVideo }) => {
  const { title } = op;
  return (
    <option value={title} selected={title === findVideo?.title}>
      {title}
    </option>
  );
};

export default Option;
