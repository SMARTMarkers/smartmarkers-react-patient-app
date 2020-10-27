import * as types from './types'
import { RootState } from './models'

export const initialState: RootState = {
    // patients: [],
    reports: [],
    selectedReport: null,
    // selectedPatient: null,
    selectedTask: null,
    tasks: [],
}

export function mainReducer(state: RootState = { ...initialState }, action: any) {
    switch (action.type) {
        // case types.SET_PATIENTS_LIST:
        //   return {
        //     ...state,
        //     patients: action.patients,
        //   }
        case types.SET_TASKS:
            return {
                ...state,
                tasks: action.tasks,
            }
        case types.SET_REPORTS:
            return {
                ...state,
                reports: action.reports,
            }
        case types.SET_SELECTED_REPORT:
            return {
                ...state,
                selectedReport: action.report,
            }
        // case types.SET_SELECTED_TASK:
        //   return {
        //     ...state,
        //     selectedTask: action.task,
        //   }
        // case types.SET_SELECTED_PATIENT:
        //   return {
        //     ...state,
        //     selectedPatient: action.patient,
        //     reports: [],
        //     selectedReport: null,
        //     selectedTask: null,
        //     tasksData: {
        //       patientId: '',
        //       tasks: [],
        //     },
        //   }
        default:
            return state
    }
}
