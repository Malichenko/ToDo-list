// Core
import { useState, createRef } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

// Hooks
import { useCheckListUpdater } from "./useCheckListUpdater";
import { useChecklistResetter } from "./useChecklistResetter";
import { useChecklistFocusInit } from "./useChecklistFocusInit";

export const useCheckList = (props) => {
  const { setFieldValue, isParentFormChanged } = props;
  const { selectedTask } = useSelector((state) => state.taskManager);
  const [dynamicFields, setDynamicFields] = useState([]);

  const subTasks = selectedTask && selectedTask.checklist;
  const initialSubTasks = subTasks && subTasks.map((subTask) => subTask.title);
  const initialCompletedTasks =
    selectedTask &&
    selectedTask.checklist &&
    selectedTask.checklist.filter((subTask) => subTask.completed === true).map((subTask) => subTask.hash);

  const { values, getFieldProps, setValues, resetForm } = useFormik({
    initialValues: {
      subTasks: initialSubTasks || [],
      completedTasks: initialCompletedTasks || [],
      completedDynamicTasks: [],
      refs: [],
    },
    enableReinitialize: true,
  });

  useChecklistResetter({ isParentFormChanged, resetForm, setDynamicFields });

  useCheckListUpdater({ values, selectedTask, setFieldValue, dynamicFields });

  useChecklistFocusInit(dynamicFields);

  const toggleSubtaskCheck = (currentHash) => {
    const completedSubtask = values.completedTasks;

    if (values && completedSubtask.includes(currentHash)) {
      setValues({
        ...values,
        completedTasks: completedSubtask.filter((hash) => hash !== currentHash),
      });
    } else {
      setValues({
        ...values,
        completedTasks: [...completedSubtask, currentHash],
      });
    }
  };

  const toggleDynamicTaskCheck = (index) => {
    const originalCompletedTasks = values.completedDynamicTasks;

    if (originalCompletedTasks.includes(index)) {
      const filtered = originalCompletedTasks.filter((currentSubTask) => {
        return currentSubTask !== index;
      });

      setValues({
        ...values,
        completedTasks: values.completedTasks,
        completedDynamicTasks: filtered,
      });
    } else {
      setValues({
        ...values,
        completedTasks: values.completedTasks,
        completedDynamicTasks: [...new Set([...values.completedDynamicTasks, index])],
      });
    }
  };

  const addMore = (e) => {
    const updatedSubTasks = [...values.subTasks];
    const ref = createRef();

    const latestIndex = values.subTasks.length;
    updatedSubTasks[latestIndex] = e.target.value;

    setValues({
      completedTasks: values.completedTasks,
      completedDynamicTasks: values.completedDynamicTasks,
      subTasks: updatedSubTasks,
    });

    const futureSubTasks = [
      ...dynamicFields,
      {
        title: e.target.value,
        ref: ref,
      },
    ];

    setDynamicFields(futureSubTasks);
    e.target.value = "";
  };

  return {
    subTasks,
    getFieldProps,
    toggleSubtaskCheck,
    addMore,
    dynamicFields,
    toggleDynamicTaskCheck,
  };
};
