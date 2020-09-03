import React from 'react'
import { useHistory } from '../react-router'
import { List, ListItem, Text, Body } from 'native-base'
import { useFhirContext } from 'smartmarkers'
import { RequestList, Task, TaskScheduleStatus } from 'smartmarkers'

const CompletedScreen: React.FC<any> = () => {
    const { user } = useFhirContext()
    const history = useHistory()

    const onItemPress = async (item: Task) => {
        history.push(`history/${item.request?.id}/${item.instrument?.id}/true`)
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
                statuses={[TaskScheduleStatus.Completed]}
            />
        </List>
    )
}

export default CompletedScreen
