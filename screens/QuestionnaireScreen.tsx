import React, { useReducer } from 'react'
import { View, Spinner } from 'native-base'
import { useParams, useHistory } from '../react-router'
import { useFhirContext, SessionWizard, Task } from 'smartmarkers'

interface RouteParams {
    rid: string
}

const QuestionnaireScreen: React.FC<any> = props => {
    const { rid } = useParams<RouteParams>()
    const history = useHistory()
    const { server, user } = useFhirContext()
    const [isReady, setIsReady] = React.useState(false)
    const [task, setTask] = React.useState<Task | null>(null)

    console.log(user)
    const patientId = user && user.resourceType === 'Patient' ? user.id : undefined

    React.useEffect(() => {
        if (!isReady) {
            const loadItem = async () => {
                if (server) {
                    const task = await server.getTaskByRequestId(rid, patientId)
                    setTask(task)
                }
                setIsReady(true)
            }
            loadItem()
        }
    }, [])

    if (!isReady) {
        return <Spinner />
    }

    if (task) {
        return (
            <SessionWizard
                tasks={[task]}
                onCompleted={() => history.push(`/dashboard`)}
            ></SessionWizard>
        )
    } else {
        return <View>Failed to load task</View>
    }
}

export default QuestionnaireScreen
