// Core
import React from "react";

// Components
import { ToDoList } from "./components/todoList";
import { Card } from "./components/card";

// Hooks
import { useTaskManager } from "./hooks/useTaskManager";

// Styles
import Styles from "./Styles.module.scss";

export const TaskManager = () => {
  const { createNewTask } = useTaskManager();
  return (
    <>
      <main>
        <div className={Styles.controls}>
          <button className={Styles["button-create-task"]} onClick={createNewTask}>New Task</button>
        </div>
        <div className={Styles.wrap}>
          <ToDoList />
          <Card />
        </div>
      </main>
    </>
  );
};
