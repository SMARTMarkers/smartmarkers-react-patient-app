import React from 'react'
import { useHistory } from '../react-router'
import { ExampleType } from '../example'
import { List, ListItem, Right, Icon, Text, Body } from 'native-base'

const SurveysListScreen: React.FC = () => {
    const history = useHistory()
    const items = Object.keys(ExampleType)
    return (
        <List>
            {items.map((item, index) => (
                <ListItem
                    button
                    noIndent
                    key={index}
                    onPress={() => {
                        history.push(`/survey/${(ExampleType as any)[item]}`)
                    }}
                >
                    <Body>
                        <Text>{item}</Text>
                        <Text note>{(ExampleType as any)[item]}</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
            ))}
            {items.map((item, index) => (
                <ListItem
                    button
                    noIndent
                    key={index}
                    onPress={() => {
                        history.push(`/survey-wizard/${(ExampleType as any)[item]}`)
                    }}
                >
                    <Body>
                        <Text>Wizard {item}</Text>
                        <Text note>{(ExampleType as any)[item]}</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
            ))}
        </List>
    )
}

export default SurveysListScreen
