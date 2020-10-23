import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useHistory } from '../react-router'
import { List, ListItem, Text, Body, Right, Icon, Button, View, Spinner } from 'native-base'
import {
    useFhirContext,
    Report,
    ReportType,
    ReportFactory,
    QuestionnaireResponse,
} from 'smartmarkers'
import { Dimensions, StyleSheet } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

interface RouteParams {
    completed: string
    srId: string
    qId: string
    instrumentTitle: string
}

const TaskScreen: React.FC<any> = props => {
    const { user, server } = useFhirContext()
    const { srId, qId, completed, instrumentTitle } = useParams<RouteParams>()
    const history = useHistory()

    const [isReady, setIsReady] = React.useState(false)
    const [items, setItems] = React.useState<Report[] | undefined>([])
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        if (!items && !items!.length) return
        const data: any = []
        items?.forEach((report: Report) => {
            const questionnaireResponse = report as QuestionnaireResponse
            if (questionnaireResponse.extension) {
                const scores: any = questionnaireResponse.extension.filter(
                    (el: any) =>
                        el.url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-scores'
                )

                if (scores[0]) {
                    const theta = scores[0].extension.filter(
                        (el: any) =>
                            el.url ===
                            'http://hl7.org/fhir/StructureDefinition/questionnaire-scores/theta'
                    )[0]
                    theta && data.push(theta.valueDecimal * 10 + 50)
                }
            } else {
                data.push(Math.random() * 10 + 50)
            }
        })
        setChartData(data)
    }, [items])

    React.useEffect(() => {
        const loadItems = async () => {
            if (server) {
                const items = await server?.getPatientReports(
                    ReportType.QuestionnaireResponse,
                    `patient=${user?.id}&based-on=ServiceRequest/${srId}`,
                    false
                )
                const factory = new ReportFactory(server)
                const reports = items.map((i: any) => factory.createReport(i))
                setItems(reports)
            }

            setIsReady(true)
        }
        loadItems()
    }, [srId, user, user?.id])

    const onItemPress = (item: Report) => {
        history.push(`/response/${item.id}`)
    }

    const startQuest = () => {
        history.push(`/questionnaire/${srId}/${qId}`)
    }

    const renderItem = (item: Report, key: any) => (
        <ListItem key={item.id} onPress={() => onItemPress(item)} style={styles.listItem}>
            <Body>
                <Text style={styles.title}>
                    {new Date(item.meta?.lastUpdated as string).toLocaleDateString('en-US')}
                </Text>
                <Text note style={styles.note}>
                    {item.getNote()}
                </Text>
            </Body>
            <Right>
                <Icon style={{ color: '#002a78' }} active name="arrow-forward" />
            </Right>
        </ListItem>
    )

    const getRequestList = () => {
        if (!isReady) {
            return <Spinner />
        }

        if (items?.length) {
            return <>{items?.map((item, index) => renderItem(item, index))}</>
        } else {
            return (
                <ListItem>
                    <Body>
                        <Text note>NO ITEMS</Text>
                    </Body>
                </ListItem>
            )
        }
    }

    return (
        <List>
            <View style={{ margin: 15 }}>
                <Text style={styles.headerTitle}>{instrumentTitle}</Text>
                <Text note>Questionnaire</Text>
                {completed == 'false' && (
                    <Button onPress={startQuest} style={styles.startButton}>
                        <Text>Start questionnaire</Text>
                    </Button>
                )}
            </View>
            <View style={{ marginLeft: 15, marginRight: 15 }}>
                {!!chartData.length && (
                    <LineChart
                        data={{
                            labels: [],
                            datasets: [
                                {
                                    data: chartData,
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width - 30} // from react-native
                        height={220}
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                )}
            </View>
            <ListItem itemHeader>
                <Text>RESPONSES</Text>
            </ListItem>
            {getRequestList()}
        </List>
    )
}

export default TaskScreen

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#f0f2f8',
        borderRadius: 10,
        marginBottom: 3,
        paddingLeft: 15,
        paddingRight: 15,
        marginRight: 15,
    },
    title: { textAlign: 'left', color: '#002a78', fontWeight: 'bold' },
    note: { textAlign: 'left', color: '#a4a5a6' },
    headerTitle: { textAlign: 'left', fontSize: 20, fontWeight: 'bold', color: '#575757' },
    startButton: {
        backgroundColor: '#499f67',
        flexGrow: 0,
        alignSelf: 'flex-start',
    },
})
