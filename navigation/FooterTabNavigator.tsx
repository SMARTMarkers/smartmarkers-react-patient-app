import React from 'react'
import { FooterTab, Button, Icon, Text } from 'native-base'
import { useHistory } from 'react-router-dom'
import { FooterRoutes } from './FooterRoutes'

const FooterTabNavigator: React.FC = () => {
    const history = useHistory()
    const currentPath = history.location.pathname

    let position = FooterRoutes.findIndex(({ path }) => path === currentPath)
    if (currentPath.startsWith('/survey/')) {
        position = 1
    }
    return (
        <FooterTab>
            {FooterRoutes.map((route, index) => {
                const isActive = index === position
                return (
                    <Button
                        key={index}
                        active={isActive}
                        vertical
                        onPress={() => {
                            history.push(route.path)
                        }}
                    >
                        <Icon active={isActive} name={route.icon} />
                        <Text>{route.name}</Text>
                    </Button>
                )
            })}
        </FooterTab>
    )
}

export default FooterTabNavigator
