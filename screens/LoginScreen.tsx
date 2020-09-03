import React from 'react'
import { Text, Button, Form } from 'native-base'
import { useFhirContext } from 'smartmarkers'
import { Redirect } from 'react-router-dom'

const LoginScreen: React.FC<any> = () => {
    const { isAuthenticated, login } = useFhirContext()
    const onLoginPress = () => {
        login()
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Form>
            <Text style={{ alignSelf: 'center', padding: 32 }}>Login by pressing Login button</Text>
            <Button full primary style={{ alignSelf: 'center', margin: 20 }} onPress={onLoginPress}>
                <Text>Login</Text>
            </Button>
        </Form>
    )
}

export default LoginScreen
