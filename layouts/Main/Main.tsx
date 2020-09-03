import React from 'react'
import { useHistory } from '../../react-router'
import FooterTabNavigator from '../../navigation/FooterTabNavigator'
import {
    Container,
    Header,
    Content,
    Footer,
    Left,
    Button,
    Icon,
    Title,
    Right,
    Body,
} from 'native-base'
import { FooterRoutes } from '../../navigation/FooterRoutes'
import { useFhirContext } from 'smartmarkers'

interface MainProps {
    children: React.ReactNode
}

const Main: React.FC<MainProps> = ({ ...props }) => {
    const { children } = props
    const history = useHistory()
    const { user, isAuthenticated } = useFhirContext()
    const isPatient = user && user.resourceType.toLowerCase() == 'patient'

    const footerRoutePaths = FooterRoutes.map(route => route.path)
    const isFooterRoute = footerRoutePaths.includes(history.location.pathname)
    const isLoginOrNotFound = ['/not-found', '/login'].includes(history.location.pathname)
    const showBackButton = !isFooterRoute && !isLoginOrNotFound
    const onPress = () => {
        history.goBack()
    }

    const onPersonPress = () => {
        history.push('/settings')
    }

    return (
        <Container>
            <Header noLeft={isFooterRoute}>
                {showBackButton && (
                    <Left>
                        <Button transparent onPress={onPress}>
                            <Icon name="md-arrow-back" />
                        </Button>
                    </Left>
                )}
                <Body>
                    <Title style={{ alignSelf: 'center' }}>
                        {isPatient ? 'Patient App' : 'Practitioner App'}
                    </Title>
                </Body>
                {isAuthenticated && (
                    <Right>
                        <Button transparent onPress={onPersonPress}>
                            <Icon name="person" />
                        </Button>
                    </Right>
                )}
            </Header>
            <Content>{children}</Content>
            {isFooterRoute && (
                <Footer>
                    <FooterTabNavigator />
                </Footer>
            )}
        </Container>
    )
}

export default Main
