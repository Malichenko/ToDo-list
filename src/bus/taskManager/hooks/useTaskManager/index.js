// Core
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { taskManagerActions } from "../../actions";

// Other
import { initialCardValues } from "../../initialCardValues";

export const useTaskManager = () => {
  const dispatch = useDispatch();
  const { tasks, error, isLoading, selectedTask } = useSelector((state) => state.taskManager);
  const [taskSelected, setTaskSelected] = useState(null);

  useEffect(() => {
    if (!tasks && !isLoading) {
      dispatch(taskManagerActions.fetchTasks());
    }
  }, [dispatch, tasks, isLoading]);

  const clickHolder = (hash) => {
    setTaskSelected(hash);

    const findTask = tasks && tasks.find((task) => task.hash === hash);

    dispatch(taskManagerActions.selectedTask(findTask));
  };

  const createNewTask = () => {
    dispatch(taskManagerActions.selectedTask(initialCardValues));
  }

  return {
    taskSelected,
    selectedTask,
    tasks,
    error,
    isLoading,
    clickHolder,
    createNewTask,
  };
};
