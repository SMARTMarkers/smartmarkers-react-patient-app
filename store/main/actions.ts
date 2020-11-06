import { Report, Task } from 'smartmarkers'

import * as types from './types'

export const setTasks = (tasks: Task[]) => ({
    type: types.SET_TASKS,
    tasks,
})

export const setReports = (reports: Report[]) => ({
    type: types.SET_REPORTS,
    reports,
})

export const setSelectedReport = (report: Report | null) => ({
    type: types.SET_SELECTED_REPORT,
    report,
})

export const setSelectedTask = (task: Task | null) => ({
    type: types.SET_SELECTED_TASK,
    task,
})
