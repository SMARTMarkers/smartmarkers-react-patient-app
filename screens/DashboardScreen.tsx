import React from 'react'
import { useHistory } from '../react-router'
import { List, ListItem, Text, Body } from 'native-base'
import { useFhirContext, RequestList, Task, TaskScheduleStatus } from 'smartmarkers'

const DashboardScreen: React.FC<any> = () => {
    const { user } = useFhirContext()
    const history = useHistory()

    const onItemPress = async (item: Task) => {
        history.push(`history/${item.request?.id}/${item.instrument?.id}/false`)
    }

    return (
        <List>
            <ListItem noIndent>
                <Body>
                    <Text>Hello, {user?.name}</Text>
                </Body>
            </ListItem>
            <RequestList
                onItemPress={onItemPress}
                filter={'status=active'}
                statuses={[
                    TaskScheduleStatus.Due,
                    TaskScheduleStatus.Upcoming,
                    TaskScheduleStatus.Overdue,
                ]}
            />

            <ListItem onPress={() => history.push('/manual')}>
                <Body>
                    <Text>Manual DEMO</Text>
                </Body>
            </ListItem>
        </List>
    )
}

export default DashboardScreen
