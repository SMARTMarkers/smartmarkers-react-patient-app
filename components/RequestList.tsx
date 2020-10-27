import React from 'react'
import { Spinner, ListItem, Body, Right, Text, Icon } from 'native-base'
import { Task, TaskScheduleStatus, useFhirContext } from 'smartmarkers'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../store/models'
import { setTasks } from '../store/main/actions'

export interface RequestListProps {
    filter?: string
    statuses: TaskScheduleStatus[]
    renderItem: (item: Task, key: any, onItemPress: (item: Task) => void) => React.ReactNode
    onItemPress: (item: Task) => void
    patientId?: string
}

const RequestList: React.FC<RequestListProps> = props => {
    const { renderItem, filter, onItemPress, patientId } = props
    const [isReady, setIsReady] = React.useState(false)
    // const [items, setItems] = React.useState<Task[]>([]);
    const { server } = useFhirContext()

    const tasks = useSelector((store: Store) => store.root.tasks)
    const dispatch = useDispatch()

    // const render = renderItem ? renderItem : defaultRenderItem;

    const renderStatues = (items: Task[], status: string, index: number) => (
        <React.Fragment key={status}>
            <ListItem itemHeader>
                <Text style={{ fontWeight: 'bold' }}>{status.toUpperCase()}</Text>
            </ListItem>
            {items.map((item, index) => renderItem(item, index, onItemPress))}
        </React.Fragment>
    )

    React.useEffect(() => {
        setIsReady(false)
        const loadItems = async () => {
            if (server) {
                const tasks = (await server.getPatientTasksByRequests(filter, patientId)) as Task[]
                dispatch(setTasks(tasks))
            }
            setIsReady(true)
        }
        loadItems()
    }, [patientId, filter])

    if (!isReady && !tasks.length) {
        return <Spinner />
    }

    const statusesItems: any = {}
    for (let status of props.statuses) {
        statusesItems[TaskScheduleStatus[status]] = tasks.filter(
            value => value.schedule?.status == status
        )
    }

    return (
        <>
            {Object.keys(statusesItems).map(
                (key: string, index) =>
                    statusesItems[key] &&
                    statusesItems[key].length > 0 &&
                    renderStatues(statusesItems[key], key, index)
            )}
        </>
    )
}

export default RequestList
