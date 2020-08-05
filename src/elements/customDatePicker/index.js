// Core
import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export const CustomDatePicker = (props) => {
  const { label, setFieldValue, ...otherProps } = props;

  const handleChange = (value) => {
    setFieldValue("deadline", moment(value).endOf("day").format());
  };

  const today = moment().endOf("day").toDate();

  const selectedDay = moment(otherProps.value).endOf("day").toDate();

  const value = otherProps.value ? selectedDay : today;

  return (
    <div className={otherProps.deadlineCX}>
      <span className={otherProps.labelCX}>{label}</span>
      <span className={otherProps.dateCX}>
        <DatePicker 
          onChange={handleChange} 
          minDate={today} 
          value={value} 
          selected={value || null} 
          dateFormat="MMMM d, yyyy"
        />
      </span>
    </div>
  );
};
