import React from 'react'
import { useParams } from '../react-router'
import { View, Spinner } from 'native-base'
import { useFhirContext, Report, QuestionnaireResponse, FhirResourceView } from 'smartmarkers'

interface RouteParams {
    qrId: string
}

const FhirResource: React.FC<any> = props => {
    const { server } = useFhirContext()
    const { qrId } = useParams<RouteParams>()
    const [isReady, setIsReady] = React.useState(false)
    const [item, setItem] = React.useState<Report | undefined>(undefined)

    React.useEffect(() => {
        const loadItems = async () => {
            if (server) {
                const item = (await server.getQuestionnaireResponseById(qrId)) as Report
                if (item) {
                    setItem(item)
                }
            }

            setIsReady(true)
        }
        loadItems()
    }, [])

    if (!isReady) {
        return <Spinner />
    }

    return (
        <View>
            {item && item.resourceType === 'QuestionnaireResponse' && (
                <FhirResourceView response={item as QuestionnaireResponse} />
            )}
        </View>
    )
}

export default FhirResource
