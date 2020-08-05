// Types
import { types } from "./types";

const initialState = Object.freeze({
  tasks: null,
  error: null,
	isLoading: false,
	selectedTask: null,
});

export const taskManagerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.TASK_START_FETCHING:
      return {
        ...state,
        isLoading: true,
			};
		case types.TASK_STOP_FETCHING:
			return {
				...state,
				isLoading: false,
			}
		case types.TASK_FILL_TASK: 
			return {
				...state,
				error: null,
				tasks: payload
			}
		case types.TASK_SELECTED_TASK:
			return {
				...state,
				selectedTask: payload,
			}
		case types.TASK_SET_FETCHING_ERROR:
			return {
				...state,
				error: true,
				tasks: payload
			}
    default:
      return {
        ...state,
      };
  }
};
