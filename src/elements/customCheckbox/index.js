// Core
import React from "react";
import cx from "classnames";

export const CustomCheckbox = ({ blockCX, completedCX, type, name, id, onChange, onBlur, value }) => {
  const styleCX = cx(`${blockCX}`, { [`${completedCX}`]: value});
  
  return (
    <div className={styleCX}>
      <input type={type} name={name} id={id} onChange={onChange} onBlur={onBlur} />
      <label htmlFor={id}>Mark as complete</label>
    </div>
  );
};
