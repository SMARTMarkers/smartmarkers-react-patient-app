import React from 'react'
import { View, Spinner, Text } from 'native-base'
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

    const patientId = user && user.resourceType === 'Patient' ? user.id : undefined

    const onCancel = () => history.push('/')

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

    if (!task?.instrument) {
        const instrumentName = task?.getTitle()
        return (
            <Text
                style={{
                    width: '100%',
                    textAlign: 'center',
                    color: '#f22e3b',
                    marginTop: 25,
                    fontWeight: 'bold',
                    fontSize: 24,
                }}
            >
                {`Instrument ${instrumentName ? `${instrumentName} ` : ''}could not be resolved`}
            </Text>
        )
    }

    if (task) {
        return (
            <SessionWizard
                tasks={[task]}
                onCompleted={() => history.push(`/dashboard`)}
                onCancel={onCancel}
            ></SessionWizard>
        )
    } else {
        return <View>Failed to load task</View>
    }
}

export default QuestionnaireScreen
