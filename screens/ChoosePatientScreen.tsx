import React from 'react'
import { useHistory, useParams } from '../react-router'
import { List, ListItem, Text } from 'native-base'
import { IPatient, PatientList } from 'smartmarkers'


interface RouteParams {
    instrumentId: string
}

const ChoosePatientScreen: React.FC<any> = () => {
    const { instrumentId } = useParams<RouteParams>()
    const history = useHistory()

    const onItemPress = async (item: IPatient) => {
        history.push(`/create-service-request/${instrumentId}/${item.id}/`)
    }

    return (
        <List>
            <ListItem itemHeader>
                <Text>PATIENTS</Text>
            </ListItem>
            <PatientList onItemPress={onItemPress} filter={'active=true'} />
        </List>
    )
}

export default ChoosePatientScreen
