import React from 'react'
import { useParams } from '../react-router'
import { View, Spinner } from 'native-base'
import { useFhirContext, Report, QuestionnaireResponse, FhirResourceView } from 'smartmarkers'
import { Store } from '../store/models'
import { useSelector } from 'react-redux'

interface RouteParams {
    qrId: string
}

const FhirResource: React.FC<any> = props => {
    const { server } = useFhirContext()
    const { qrId } = useParams<RouteParams>()
    // const [isReady, setIsReady] = React.useState(false)
    // const [item, setItem] = React.useState<Report | undefined>(undefined)

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
    const selectedReport = useSelector((store: Store) => store.root.selectedReport)

    return (
        <View>
            {selectedReport && selectedReport.resourceType === 'QuestionnaireResponse' && (
                <FhirResourceView response={selectedReport as QuestionnaireResponse} />
            )}
        </View>
    )
}

export default FhirResource
