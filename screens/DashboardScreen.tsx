import React from 'react'
import { useHistory } from '../react-router'
import { List, ListItem, Text, Body, Right, Icon } from 'native-base'
import { useFhirContext, RequestList, Task, TaskScheduleStatus } from 'smartmarkers'
import { StyleSheet } from 'react-native'

const DashboardScreen: React.FC<any> = () => {
    const { user } = useFhirContext()
    const history = useHistory()

    const onItemPress = async (item: Task) => {
        history.push(`history/${item.request?.id}/${item.instrument?.id}/false/${item.getTitle()}`)
    }

    const renderItem = (
        item: Task,
        key: any,
        onItemPress: (item: Task) => void,
        isLast: boolean
    ) => (
        <ListItem key={key} onPress={() => onItemPress(item)} noBorder style={styles.listItem}>
            <Body>
                <Text note>#{item.request.id} | { new Date(item.request?.meta?.lastUpdated).toLocaleDateString('en-US')} </Text>        
                <Text>Instrument: <Text style={styles.title}>{item.getTitle()}</Text></Text>
                <Text>Requested by: { item.request.getRequester() } </Text>
          </Body>
          <Right>
                 <Icon style={{ color: '#002a78' }} active name="arrow-forward" />
          </Right>
        </ListItem>
    )

    return (
        <List>
            <ListItem noBorder noIndent>
                <Body>
                    <Text style={styles.patientName}>Assessment Requests</Text>
                </Body>
            </ListItem>
            <RequestList
                renderItem={renderItem}
                onItemPress={onItemPress}
                filter={'status=active'}
                statuses={[
                    TaskScheduleStatus.Due,
                    TaskScheduleStatus.Upcoming,
                    TaskScheduleStatus.Overdue,
                ]}
            />

            {/*<ListItem onPress={() => history.push('/manual')}>
                <Body>
                    <Text>Manual DEMO</Text>
                </Body>
            </ListItem>*/}
        </List>
    )
}

export default DashboardScreen

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
    patientName: { textAlign: 'left', fontSize: 20, fontWeight: 'bold', color: '#575757' },
})
