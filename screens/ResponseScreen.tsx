import React from 'react'
import { useParams, useHistory } from '../react-router'
import { View, Text, Spinner, ListItem, Body, List, Right, Icon } from 'native-base'
import {
    useFhirContext,
    Report,
    QuestionnaireResponse,
    QuestionnaireResponseView,
} from 'smartmarkers'
import { Store } from '../store/models'
import { useSelector } from 'react-redux'

interface RouteParams {
    qrId: string
}

const ResponseScreen: React.FC<any> = props => {
    const { server } = useFhirContext()
    const { qrId } = useParams<RouteParams>()
    // const [isReady, setIsReady] = React.useState(false)
    // const [item, setItem] = React.useState<Report | undefined>(undefined)
    const history = useHistory()
    const selectedReport = useSelector((store: Store) => store.root.selectedReport)

    // React.useEffect(() => {
    //     const loadItems = async () => {
    //         if (server) {
    //             const item = (await server.getQuestionnaireResponseById(qrId)) as Report
    //             if (item) {
    //                 setItem(item)
    //             }
    //         }

    //         setIsReady(true)
    //     }
    //     loadItems()
    // }, [])

    // if (!isReady) {
    //     return <Spinner />
    // }

    const goToFhirResource = () => history.push(`/response/${qrId}/resource`)

    return (
        <View>
            {selectedReport && selectedReport.resourceType === 'QuestionnaireResponse' && (
                <QuestionnaireResponseView response={selectedReport as QuestionnaireResponse} />
            )}
            <List style={{ paddingTop: 30 }}>
                <ListItem style={{ borderTopWidth: 1 }} onPress={goToFhirResource}>
                    <Body>
                        <Text>FHIR Resource</Text>
                    </Body>
                    <Right>
                        <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
            </List>
        </View>
    )
}

export default ResponseScreen
