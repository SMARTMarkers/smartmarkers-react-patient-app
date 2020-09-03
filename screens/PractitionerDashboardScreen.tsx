import React from 'react'
import { useHistory } from '../react-router'
import { List, ListItem, Text, Body } from 'native-base'
import { useFhirContext, InstrumentList, InstrumentType, Instrument } from 'smartmarkers'

const PractitionerDashboardScreen: React.FC<any> = () => {
    const { user } = useFhirContext()
    const history = useHistory()

    const onItemPress = async (item: Instrument) => {
        history.push(`/choose-patient/${item.id}`)
    }

    return (
        <List>
            <ListItem noIndent>
                <Body>
                    <Text>Hello, {user?.name}</Text>
                </Body>
            </ListItem>
            <ListItem itemHeader>
                <Text>Questionnaires</Text>
            </ListItem>
            <InstrumentList type={InstrumentType.Questionnaire} onItemPress={onItemPress} />
        </List>
    )
}

export default PractitionerDashboardScreen
