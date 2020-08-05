// Core
import { useEffect } from "react";

export const useCheckListUpdater = (props) => {
  const { values, selectedTask, setFieldValue, dynamicFields } = props;

  useEffect(() => {
    if (values && selectedTask && selectedTask.checklist) {
      const updatedSubTasks = selectedTask.checklist.map((currentSubTask, idx) => {
        const isCompleted = values.completedTasks.includes(currentSubTask.hash);

        return {
          title: values.subTasks[idx],
          hash: currentSubTask.hash,
          completed: isCompleted,
        };
      });
      const dynamicSubTasksStartIndex = values.subTasks.length - dynamicFields.length;
      const updatedDynamicSubTasks = dynamicFields.map((el, idx) => {
        const isCompleted = values.completedDynamicTasks.includes(idx);

        return {
          title: values.subTasks[dynamicSubTasksStartIndex + idx],
          completed: isCompleted,
        };
      });

      setFieldValue("checklist", [...updatedSubTasks, ...updatedDynamicSubTasks]);
    }
  }, [values, selectedTask, setFieldValue, dynamicFields]);
};
