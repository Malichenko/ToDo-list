// Core
import React from "react";
import { Provider } from "react-redux";

// Components
import { TaskManager } from "./bus/taskManager";

// Store
import { store } from "./init/store";

// Styles
import "./styles/index.scss";
import "react-datepicker/dist/react-datepicker.css";

export const App = () => {
  return (
    <Provider store={store}>
      <TaskManager />
    </Provider>
  );
};
