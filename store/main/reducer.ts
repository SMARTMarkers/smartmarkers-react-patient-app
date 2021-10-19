import * as types from "./types";
import { RootState } from "./models";

export const initialState: RootState = {
  reports: [],
  selectedReport: null,
  selectedTask: null,
  tasks: [],
};

export function mainReducer(
  state: RootState = { ...initialState },
  action: any
) {
  switch (action.type) {
    case types.SET_TASKS:
      return {
        ...state,
        tasks: action.tasks,
      };
    case types.SET_REPORTS:
      return {
        ...state,
        reports: action.reports,
      };
    case types.SET_SELECTED_TASK:
      return {
        ...state,
        selectedTask: action.task,
      };
    case types.SET_SELECTED_REPORT:
      return {
        ...state,
        selectedReport: action.report,
      };
    default:
      return state;
  }
}
