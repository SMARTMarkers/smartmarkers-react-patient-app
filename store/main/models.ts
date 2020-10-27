import { IPatient, Report, Task } from 'smartmarkers'

export interface TasksData {
    patientId: string
    tasks: Task[]
}

export interface RootState {
    // patients: IPatient[]
    tasks: Task[]
    reports: Report[]
    selectedReport: Report | null
    // selectedPatient: IPatient | null
    selectedTask: Task | null
}
