// Core
import { useFormik } from "formik";
import * as R from "ramda";
import { useSelector, useDispatch } from "react-redux";

// Other
import { initialCardValues } from "../../initialCardValues";
import { validationSchema } from "../../validationSchema";

// Actions
import { taskManagerActions } from "../../actions";

export const useCard = () => {
  const { selectedTask, isLoading } = useSelector((state) => state.taskManager);
  const dispatch = useDispatch();

  const saveTask = (values) => {
    if (values.hash) {
      dispatch(taskManagerActions.updateTask(values));
    } else {
      dispatch(taskManagerActions.createTask(values));
    }
  };

  const { handleSubmit, getFieldProps, resetForm, setFieldValue, values, errors, isValid } = useFormik({
    initialValues: selectedTask,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: saveTask,
  });

  const isEmpty = selectedTask && selectedTask.hash === undefined;

  const unsaved = isEmpty ? !R.equals(initialCardValues, values) : !R.equals(selectedTask, values);
  const isFormBlocked = isLoading || !unsaved;

  const setTag = (tag) => {
    setFieldValue("tag", tag);
  };

  const delTask = (hash) => {
    dispatch(taskManagerActions.deleteTask(hash));
  };

  return {
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
  };
};
