import React from 'react'
import { useHistory } from '../react-router'
import { useFhirContext, User, SessionWizard, Task, Server, InstrumentFactory } from 'smartmarkers'
import { ExampleMap, ExampleType } from '../example'

const ManualScreen: React.FC<any> = props => {
    const history = useHistory()
    const { server, user } = useFhirContext()
    const instrumentFactory = new InstrumentFactory(server as Server, undefined)
    const instrument1 = instrumentFactory.createInstrument(ExampleMap[ExampleType.General])
    const instrument2 = instrumentFactory.createInstrument(ExampleMap[ExampleType.GlasgowComaScore])
    const task1 = new Task({
        instrument: instrument1,
        patient: user as User,
        server: server as Server,
    })
    const task2 = new Task({
        instrument: instrument2,
        patient: user as User,
        server: server as Server,
    })

    return (
        <SessionWizard
            tasks={[task1, task2]}
            onCompleted={() => history.push(`/dashboard`)}
        ></SessionWizard>
    )
}

export default ManualScreen
