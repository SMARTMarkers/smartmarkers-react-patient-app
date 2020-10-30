import { Report, Task } from 'smartmarkers'

export interface TasksData {
    patientId: string
    tasks: Task[]
}

export interface RootState {
    tasks: Task[]
    reports: Report[]
    selectedReport: Report | null
    selectedTask: Task | null
}
