// Core
import React from "react";
import cx from "classnames";
import shortid from "shortid";

// Hooks
import { useCheckList } from "../../hooks/useChecklist";

// Styles
import Styles from "./Styles.module.scss";

export const Checklist = ({ setFieldValue, isParentFormChanged }) => {
  const { subTasks, getFieldProps, toggleSubtaskCheck, addMore, dynamicFields, toggleDynamicTaskCheck } = useCheckList({
    setFieldValue,
    isParentFormChanged,
  });

  const subTasksJSX =
    subTasks &&
    subTasks.map((subTask, idx) => {
      const currentInputName = `subTasks.${idx}`;
      const currentInputProps = getFieldProps(currentInputName);
      const currentInputTitle = currentInputProps && currentInputProps.value;
      const currentCompletedTasks = getFieldProps("completedTasks").value;
      const classes = cx(`${Styles["sub-task"]}`, {
        [`${Styles.completed}`]: currentCompletedTasks && currentCompletedTasks.includes(subTask.hash),
      });

      return (
        <div className={classes} key={shortid.generate()}>
          <button type="button" onClick={() => toggleSubtaskCheck(subTask.hash)} />
          <input
            type="text"
            name={currentInputName}
            value={currentInputTitle || ""}
            onChange={currentInputProps.onChange}
            onBlur={currentInputProps.onBlur}
            ref={subTask.ref}
          />
        </div>
      );
    });

  const dynamicFieldsJSX = dynamicFields.map((subTask, idx) => {
    const dynamicFieldIdx = subTasks ? subTasks.length + idx : idx;
    const currentFieldName = `subTasks.${dynamicFieldIdx}`;
    const currentFieldProps = getFieldProps(currentFieldName);
    const currentFieldTitle = currentFieldProps && currentFieldProps.value;
    const currentCompletedTasks = getFieldProps("completedDynamicTasks").value;
    const classes = cx(`${Styles["sub-task"]}`, {
      [`${Styles.completed}`]: currentCompletedTasks && currentCompletedTasks.includes(idx),
    });

    return (
      <div className={classes} key={`dynamicField-${idx}`}>
        <button type="button" onClick={() => toggleDynamicTaskCheck(idx)} />
        <input
          type="text"
          name={currentFieldName}
          value={currentFieldTitle || ""}
          onChange={currentFieldProps.onChange}
          onBlur={currentFieldProps.onBlur}
          ref={subTask.ref}
        />
      </div>
    );
  });

  return (
    <div className={Styles.checklist}>
      <span className={Styles.label}>Checklist</span>
      <div className={Styles["sub-tasks"]}>
        {subTasksJSX}
        {dynamicFieldsJSX}
        <div className={Styles["sub-task"]}>
          <button style={{ cursor: "inherit" }} disabled />
          <input type="text" placeholder="Add more" onChange={addMore} />
        </div>
      </div>
    </div>
  );
};
