// Core
import React from "react";

export const CustomTextarea = (props) => {
  const { containreCX, labelCX, textCX, label, placeholder, value, id, ...otherProps } = props;

  const textareaValue = value || "";

  return (
    <div className={containreCX}>
      <label htmlFor={id} className={labelCX}>
        {label}
      </label>
      <textarea 
        id={id} 
        placeholder={placeholder} 
        className={textCX} 
        value={textareaValue} 
        {...otherProps} 
      />
    </div>
  );
};
