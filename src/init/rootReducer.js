// Core
import { combineReducers } from "redux";

// Reducers
import { taskManagerReducer as taskManager } from "../bus/taskManager/reducer";

export const rootReducer = combineReducers({
  taskManager,
});
