import React, { useState } from 'react'
import { Router } from './react-router'
import Routes from './navigation/Routes'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import { FhirProvider, FhirProviderProps } from 'smartmarkers'
import { serverUrl } from './urls'

const App: React.FC = () => {
    const [isReady, setIsReady] = useState(false)
    
    React.useEffect(() => {
        const loadAssets = async () => {
            await Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                ...Ionicons.font,
            })
            setIsReady(true)
        }
        loadAssets()
    }, [])

    if (!isReady) {
        return <AppLoading />
    }

    const redirectUri = Linking.makeUrl('auth-callback')

    const iss = serverUrl
    const scope =
        'openid fhirUser offline_access user/*.* patient/*.* launch/encounter launch/patient profile'
    const settings: FhirProviderProps = {
        client_id: 'my_web_app',
        scope,
        iss,
        redirectUri,
        promisSettings: {
            url: 'https://mss.fsm.northwestern.edu/ac_api_cr/2018-10/',
            token: '',
            identifier: '',
        },
    }

    return (
        <FhirProvider {...settings}>
            <Router>
                <Routes />
            </Router>
        </FhirProvider>
    )
}

export default App
