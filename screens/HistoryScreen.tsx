import React from 'react'
import { useParams, useHistory } from '../react-router'
import { List, ListItem, Text, Body, Right, Icon } from 'native-base'
import { useFhirContext, ReportList, Report, ReportType } from 'smartmarkers'

interface RouteParams {
    completed: string
    srId: string
    qId: string
}

const HistoryScreen: React.FC<any> = props => {
    const { user } = useFhirContext()
    const { srId, qId, completed } = useParams<RouteParams>()
    const history = useHistory()

    const onItemPress = (item: Report) => {
        history.push(`/response/${item.id}`)
    }

    const startQuest = () => {
        history.push(`/questionnaire/${srId}/${qId}`)
    }

    return (
        <List>
            {completed == 'false' && (
                <ListItem onPress={startQuest}>
                    <Body>
                        <Text>Start questionnaire</Text>
                    </Body>
                    <Right>
                        <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
            )}
            <ListItem itemHeader>
                <Text>HISTORY</Text>
            </ListItem>
            <ReportList
                type={ReportType.QuestionnaireResponse}
                onItemPress={onItemPress}
                filter={`patient=${user?.id}&based-on=ServiceRequest/${srId}`}
            />
        </List>
    )
}

export default HistoryScreen
