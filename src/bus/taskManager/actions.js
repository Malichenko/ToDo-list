// Core
import { batch } from "react-redux";

// Types
import { types } from "./types";

// Api
import { api } from "../../api/index";

export const taskManagerActions = Object.freeze({
  startFetching: () => {
    return {
      type: types.TASK_START_FETCHING,
    };
  },
  stopFetching: () => {
    return {
      type: types.TASK_STOP_FETCHING,
    };
  },
  fill: (payload) => {
    return {
      type: types.TASK_FILL_TASK,
      payload,
    };
  },
  selectedTask: (payload) => {
    return {
      type: types.TASK_SELECTED_TASK,
      payload,
    };
  },
  setFetchingError: (error) => {
    return {
      type: types.TASK_SET_FETCHING_ERROR,
      error: true,
      payload: error,
    };
  },
  // ASYNC
  fetchTasks: () => async (dispatch) => {
    dispatch(taskManagerActions.startFetching());

    try {
      const response = await api.fetch();
      const { data } = await response.json();

      dispatch(taskManagerActions.fill(data));
    } catch (err) {
      const error = {
        message: err.message,
      };

      dispatch(taskManagerActions.setFetchingError(error));
    } finally {
      dispatch(taskManagerActions.stopFetching());
    }
  },
  createTask: (payload) => async (dispatch) => {
    dispatch(taskManagerActions.startFetching());

    try {
      await api.create(payload);

      batch(() => {
        dispatch(taskManagerActions.selectedTask(null));
        dispatch(taskManagerActions.fetchTasks());
      });
    } catch (err) {
      const error = {
        message: err.message,
      };

      dispatch(taskManagerActions.setFetchingError(error));
    } finally {
      dispatch(taskManagerActions.stopFetching());
    }
  },
  updateTask: (payload) => async (dispatch) => {
    dispatch(taskManagerActions.startFetching());

    delete payload.created;

    const { hash, ...otherProps } = payload;

    try {
      await api.update(hash, otherProps);

      batch(() => {
        dispatch(taskManagerActions.selectedTask(null));
        dispatch(taskManagerActions.fetchTasks());
      });
    } catch (err) {
      const error = {
        message: err.message,
      };

      dispatch(taskManagerActions.setFetchingError(error));
    } finally {
      dispatch(taskManagerActions.stopFetching());
    }
  },
  deleteTask: (payload) => async (dispatch) => {
    dispatch(taskManagerActions.startFetching());

    await api.delete(payload);

    batch(() => {
      dispatch(taskManagerActions.selectedTask(null));
      dispatch(taskManagerActions.fetchTasks());
      dispatch(taskManagerActions.stopFetching());
    });
  },
});
