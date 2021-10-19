import React from "react";
import { useParams, useHistory } from "../react-router";
import {
  List,
  ListItem,
  Text,
  Body,
  Right,
  Icon,
  Button,
  View,
  Spinner,
} from "native-base";
import {
  useFhirContext,
  Report,
  ReportType,
  ReportFactory,
  PromisLineChart,
  HeatMap,
  TransformReports,
  IHeatMap,
} from "../smartmarkers-router";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../store/models";
import { setReports, setSelectedReport } from "../store/main/actions";
import { HeatMapData } from "./HeatMapData";

interface RouteParams {
  completed: string;
  srId: string;
  qId: string;
}

const TaskScreen: React.FC<any> = (props) => {
  const { user, server } = useFhirContext();
  const { srId, qId, completed } = useParams<RouteParams>();
  const history = useHistory();
  const reports = useSelector((store: Store) => store.root.reports);
  const dispatch = useDispatch();
  const selectedTask = useSelector((store: Store) => store.root.selectedTask);

  const [isReady, setIsReady] = React.useState(false);

  const [maxRangeValue, setMaxRangeValue] = React.useState<number>();
  const [sectionData, setSectionData] = React.useState<IHeatMap[]>([]);
  const selectedTasks = useSelector((store: Store) => store.root.selectedTask);

  React.useEffect(() => {
    const loadItems = async () => {
      if (server) {
        const items = await server?.getPatientReports(
          ReportType.QuestionnaireResponse,
          `patient=${user?.id}&based-on=ServiceRequest/${srId}`,
          false
        );
        const factory = new ReportFactory(server);
        const reports = items.map((i: any) => factory.createReport(i));
        dispatch(setReports(reports));
      }
      setIsReady(true);
    };
    loadItems();
  }, [srId, user, user?.id]);

  const onItemPress = (item: Report) => {
    dispatch(setSelectedReport(item));
    history.push(`/response/${item.id}`);
  };

  const startQuest = () => {
    history.push(`/questionnaire/${srId}/${qId}`);
  };

  const renderItem = (item: Report, key: any) => (
    <ListItem
      key={item.id}
      onPress={() => onItemPress(item)}
      style={styles.listItem}
    >
      <Body>
        <Text style={styles.title}>
          {new Date(item.meta?.lastUpdated as string).toLocaleDateString(
            "en-US"
          )}
          <Text style= {styles.time}>
          &nbsp;
          {new Date(item.meta?.lastUpdated as string).toLocaleTimeString(
            "en-US"
          )}
          </Text>
        </Text>
        <Text note style={styles.note}>
          {item.getNote()}
        </Text>
      </Body>
      <Right>
        <Icon style={{ color: "#002a78" }} active name="arrow-forward" />
      </Right>
    </ListItem>
  );

  const getRequestList = () => {
    if (!isReady && !reports.length) {
      return <Spinner />;
    }

    if (reports?.length) {
      return <>{reports?.map((item, index) => renderItem(item, index))}</>;
    } else {
      return (
        <ListItem>
          <Body>
            <Text note>NO ITEMS</Text>
          </Body>
        </ListItem>
      );
    }
  };

  return (
    <List>
      <View style={{ margin: 15 }}>
        <Text style={styles.headerTitle}>
          {selectedTask?.instrument?.getTitle()}
        </Text>
        <Text note>Questionnaire</Text>
        {completed == "false" && (
          <Button onPress={startQuest} style={styles.startButton}>
            <Text>Start questionnaire</Text>
          </Button>
        )}
      </View>
      <PromisLineChart responses={reports} />
      <ListItem itemHeader>
        <Text>RESPONSES</Text>
      </ListItem>
      {getRequestList()}
      <ListItem itemHeader>
        <Text>HEAT MAP</Text>
      </ListItem>
      <HeatMapData/>
    </List>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "#f0f2f8",
    borderRadius: 10,
    marginBottom: 3,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 15,
  },
  title: { textAlign: "left", color: "#002a78", fontWeight: "bold" },
  time:{ color: "#a7a7a7" },
  note: { textAlign: "left", color: "#a4a5a6" },
  headerTitle: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    color: "#575757",
    marginBottom: 3,
  },
  startButton: {
    backgroundColor: "#499f67",
    flexGrow: 0,
    alignSelf: "flex-start",
    marginTop: 7,
  },
});
