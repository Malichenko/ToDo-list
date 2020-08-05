// Core
import React from "react";
import shortid from "shortid";

// Components
import { Checklist } from "../checklist";

// Elements
import { CustomDatePicker } from "../../../../elements/customDatePicker";
import { CustomInput } from "../../../../elements/customInput";
import { CustomTextarea } from "../../../../elements/customTextrea";
import { CustomCheckbox } from "../../../../elements/customCheckbox";
import { Tag } from "../../../../elements/tag";

// Hooks
import { useCard } from "../../hooks/useCard";

// Styles
import Styles from "./Styles.module.scss";
import ShareStyles from "../../../../share/Styles.module.scss";

// Other
import { tagsOption } from "./tagsOption";

export const Card = () => {
  const {
    selectedTask,
    handleSubmit,
    getFieldProps,
    resetForm,
    setFieldValue,
    values,
    errors,
    isValid,
    setTag,
    isFormBlocked,
    delTask,
  } = useCard();

  const titleErrorJSX = errors.title && <p>{errors.title}</p>;
  const tagErrorJSX = errors.tag && <p>{errors.tag}</p>;
  const checklistErrorJSX =
    errors.checklist &&
    (typeof errors.checklist === "string" ? (
      <p>{errors.checklist}</p>
    ) : (
      errors.checklist.map((el, idx) => <p key={shortid.generate()}>{`${idx + 1} ${el.title}`}</p>)
    ));

  const errorsJSX = Object.keys(errors) && Object.keys(errors).length > 0 && (
    <div className={Styles["errors-container"]}>
      {titleErrorJSX}
      {tagErrorJSX}
      {checklistErrorJSX}
    </div>
  );

  const tagsJSX = tagsOption.map((tag, idx) => {
    return (
      <Tag
        key={String(idx)}
        tag={tag}
        setTag={setTag}
        isSelected={values && values.tag === tag}
        selectedCX={ShareStyles.selected}
      />
    );
  });

  const checklistJSX = values && <Checklist setFieldValue={setFieldValue} isParentFormChanged={isFormBlocked} />;

  const hash = selectedTask && selectedTask.hash && selectedTask.hash;
  const deleteTaskJSX = selectedTask && selectedTask.hash && (
    <button type="button" className={Styles["button-remove-task"]} onClick={() => delTask(hash)} />
  );

  const cardJSX = selectedTask && (
    <form className={Styles["task-card"]} onSubmit={handleSubmit}>
      <div className={Styles.head}>
        <CustomCheckbox
          blockCX={Styles.left}
          completedCX={Styles.completed}
          type="checkbox"
          name="completed"
          id="completed"
          {...getFieldProps("completed")}
        />
        {deleteTaskJSX}
      </div>
      <div className={Styles.content}>
        <CustomInput name="title" cx={Styles.title} type="text" placeholder="Task title" {...getFieldProps("title")} />
        <CustomDatePicker
          label="Due to"
          deadlineCX={Styles.deadline}
          labelCX={Styles.label}
          dateCX={Styles.date}
          setFieldValue={setFieldValue}
          {...getFieldProps("deadline")}
        />
        <CustomTextarea
          containreCX={Styles.description}
          labelCX={Styles.label}
          textCX={Styles.text}
          id="description"
          label="Description"
          placeholder="Describe your event..."
          {...getFieldProps("description")}
        />
        {checklistJSX}
        <div className={ShareStyles.tags}>{tagsJSX}</div>
        {errorsJSX}
        <div className={Styles["form-controls"]}>
          <button type="reset" className={Styles["button-reset-task"]} onClick={resetForm} disabled={isFormBlocked}>
            Reset
          </button>
          <button type="submit" className={Styles["button-save-task"]} disabled={isFormBlocked || !isValid}>
            Save
          </button>
        </div>
      </div>
    </form>
  );

  return <>{cardJSX}</>;
};
