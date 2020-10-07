import React from 'react'
import { useParams, useHistory } from '../react-router'
import { List, ListItem, Text, Body, Right, Icon, Button } from 'native-base'
import { useFhirContext, ReportList, Report, ReportType } from 'smartmarkers'
import { StyleSheet } from 'react-native'

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

    const renderItem = (item: Report, key: any) => (
        <ListItem key={item.id} onPress={() => onItemPress(item)} style={styles.listItem}>
            <Body>
                <Text style={styles.title}>{item.getTitle()}</Text>
                <Text note style={styles.note}>
                    {item.getNote()}
                </Text>
            </Body>
            <Right>
                <Icon style={{ color: '#002a78' }} active name="arrow-forward" />
            </Right>
        </ListItem>
    )

    return (
        <List>
            {completed == 'false' && (
                <Button onPress={startQuest} style={styles.startButton}>
                    <Text>Start questionnaire</Text>
                </Button>
            )}
            <ListItem itemHeader>
                <Text>HISTORY</Text>
            </ListItem>
            <ReportList
                useClientPatientId={false}
                renderItem={renderItem}
                type={ReportType.QuestionnaireResponse}
                onItemPress={onItemPress}
                filter={`patient=${user?.id}&based-on=ServiceRequest/${srId}`}
            />
        </List>
    )
}

export default HistoryScreen

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#f0f2f8',
        borderRadius: 10,
        marginBottom: 3,
        paddingLeft: 15,
        paddingRight: 15,
        marginRight: 15,
    },
    title: { color: '#002a78', fontWeight: 'bold' },
    note: { color: '#a4a5a6' },
    startButton: {
        backgroundColor: '#499f67',
        flexGrow: 0,
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginTop: 15,
    },
})
