import React from 'react'
import { Text, List, ListItem, Left, Button, Icon, Body, Right } from 'native-base'
import { useFhirContext } from 'smartmarkers'

const SettingsScreen: React.FC<any> = () => {
    const { user, logout } = useFhirContext()
    const onLogoutPress = () => {
        logout()
    }
    return (
        <List>
            <ListItem icon>
                <Left>
                    <Button style={{ backgroundColor: '#FF9501' }}>
                        <Icon active type="Ionicons" name="person" />
                    </Button>
                </Left>
                <Body>
                    <Text>{user?.name}</Text>
                    <Text note>Name</Text>
                </Body>
                <Right>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
            <ListItem icon>
                <Left>
                    <Button style={{ backgroundColor: '#007AFF' }}>
                        <Icon active type="Ionicons" name="calendar" />
                    </Button>
                </Left>
                <Body>
                    <Text>{user?.birthDate}</Text>
                    <Text note>Birthdate</Text>
                </Body>
                <Right>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
            <ListItem icon>
                <Left>
                    <Button style={{ backgroundColor: '#007AFF' }}>
                        <Icon active type="MaterialIcons" name="wc" />
                    </Button>
                </Left>
                <Body>
                    <Text>{user?.gender}</Text>
                    <Text note>Gender</Text>
                </Body>
                <Right>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
            <ListItem icon>
                <Left>
                    <Button style={{ backgroundColor: '#007AFF' }}>
                        <Icon active type="MaterialIcons" name="group" />
                    </Button>
                </Left>
                <Body>
                    <Text>{user?.resourceType}</Text>
                    <Text note>Role</Text>
                </Body>
                <Right>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
            <ListItem icon onPress={onLogoutPress}>
                <Left>
                    <Button style={{ backgroundColor: 'red' }}>
                        <Icon active name="md-exit" />
                    </Button>
                </Left>
                <Body>
                    <Text>Logout</Text>
                </Body>
                <Right>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
        </List>
    )
}

export default SettingsScreen
