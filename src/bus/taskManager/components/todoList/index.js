// Core
import React from "react";
import cx from "classnames";

// Components
import { ListItem } from "../listItem";

// Hooks
import { useTaskManager } from "../../hooks/useTaskManager";

// Styles
import Styles from "./Styles.module.scss";

export const ToDoList = () => {
  const { tasks, isLoading, clickHolder, taskSelected } = useTaskManager();

  const taskListJSX =
    !isLoading &&
    tasks &&
    tasks.length !== 0 &&
    tasks.map(({ title, tag, hash, deadline, completed}) => {
      const isSelected = hash === taskSelected ? true : false;
      return (
        <ListItem key={hash}
            hash={hash}
            title={title}
            tag={tag}
            isSelected={isSelected}
            deadline={deadline}
            completed={completed}
            clickHolder={clickHolder}
        />
      );
    });

  const listCX = cx(`${Styles.list}`, {[`${Styles.empty}`]: tasks === null || tasks.length === 0
  });

  return (
    <>
      <div className={listCX}>
        <div className={Styles.tasks}>{taskListJSX}</div>
      </div>
    </>
  );
};
