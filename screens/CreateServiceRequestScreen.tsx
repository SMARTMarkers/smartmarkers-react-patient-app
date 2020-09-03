import React from 'react'
import { useHistory, useParams } from '../react-router'
import { List, ListItem, Text, Body, Spinner } from 'native-base'
import { useFhirContext, TaskScheduleForm , TaskSchedule, Instrument, InstrumentType } from 'smartmarkers'

interface RouteParams {
    instrumentId: string
    patientId: string
}

const CreateServiceRequestScreen: React.FC<any> = () => {
    const { instrumentId, patientId } = useParams<RouteParams>()
    const [instrument, setInstrument] = React.useState<Instrument | undefined>(undefined)
    const [isReady, setIsReady] = React.useState(false)
    const { server } = useFhirContext()
    const history = useHistory()

    React.useEffect(() => {
        const loadInstrument = async () => {
            const instrument = await server?.getInstrument(
                InstrumentType.Questionnaire,
                instrumentId
            )
            setInstrument(instrument)
            setIsReady(true)
        }
        loadInstrument()
    }, [])

    const onSubmit = async (item: TaskSchedule) => {
        if (instrument) {
            setIsReady(false)
            const serviceRequest = await server?.createServiceRequest(instrument, item, patientId)
            history.push('/dashboard')
        }
    }

    if (!isReady) {
        return <Spinner />
    }

    return (
        <List>
            <ListItem noIndent>
                <Body>
                    <Text>Create Service Request with {instrument?.getTitle()}</Text>
                </Body>
            </ListItem>
            <TaskScheduleForm onSubmit={onSubmit} />
        </List>
    )
}

export default CreateServiceRequestScreen
